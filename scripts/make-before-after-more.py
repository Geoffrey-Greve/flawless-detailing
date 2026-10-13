"""
Builds nine more before/after pairs for the results page (one per service).

Run:  python scripts/make-before-after-more.py [name ...]      (pillow, numpy, scipy)
      PREVIEW=1 python scripts/make-before-after-more.py       (also writes mask overlays to %TEMP%)
Inputs:  scripts/ba-src/<name>.jpg   (clean stock photos)
Outputs: public/images/ba-<name>-before.jpg and ba-<name>-after.jpg

After  = the clean photo (a touch crisper inside the serviced area).
Before = the same photo with the defect painted ONLY inside the serviced area, so
         everything else (wheels, glass, background, framing) is identical in both files.
Coordinates are source pixels (the photos are 1600 px wide).
"""
import math, os, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import map_coordinates

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "ba-src")
OUT = os.path.join(HERE, "..", "public", "images")
PREVIEW = os.environ.get("PREVIEW") == "1"
PREV_DIR = os.environ.get("TEMP", ".")


# ------------------------------------------------------------------ helpers
def load(name):
    return np.asarray(Image.open(os.path.join(SRC, name + ".jpg")).convert("RGB"), dtype=np.float32)


def save(arr, name):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(os.path.join(OUT, name), quality=86, optimize=True)


def blur(a, r):
    """Gaussian blur for H x W (mask) or H x W x 3 (image) float arrays."""
    if a.ndim == 2:
        im = Image.fromarray(np.clip(a * 255, 0, 255).astype(np.uint8))
        return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255.0
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32)


def lum(a):
    return a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114


def poly_mask(h, w, polys, feather=6):
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon(p, fill=255)
    return blur(np.asarray(m, dtype=np.float32) / 255.0, feather)


def smooth(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def fbm(h, w, seed, octaves=5, base=6):
    """Fractal value noise in 0..1."""
    rnd = np.random.RandomState(seed)
    out = np.zeros((h, w), dtype=np.float32)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        n = base * (2 ** o)
        g = rnd.rand(max(2, int(n * h / max(h, w))) + 1, n + 1).astype(np.float32)
        layer = np.asarray(Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), dtype=np.float32) / 255.0
        out += layer * amp
        total += amp
        amp *= 0.5
    out /= total
    return (out - out.min()) / (out.max() - out.min() + 1e-6)


def streaks(h, w, seed, cols=140):
    """Vertical streak texture (road spray, water run-off) in 0..1."""
    rnd = np.random.RandomState(seed)
    g = rnd.rand(6, cols).astype(np.float32)
    s = np.asarray(Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), dtype=np.float32) / 255.0
    return blur(s, 1.2)


def screen(base, layer01, strength=1.0):
    l = np.clip(layer01, 0, 1)[..., None] * 255.0 * strength
    return 255.0 - (255.0 - base) * (255.0 - l) / 255.0


def mix(base, other, mask):
    m = mask[..., None]
    return base * (1 - m) + other * m


def crisp(img, mask, amount=0.7, contrast=1.06):
    mean = img.mean(axis=(0, 1), keepdims=True)
    sharp = (img - blur(img, 2.2)) * amount + img
    return mix(img, (sharp - mean) * contrast + mean, mask)


def swirl_layer(h, w, mask, seed, density=1.0, strength=1.0):
    """Fine circular micro-scratches + a few hairline scratches, as seen under light."""
    rnd = random.Random(seed)
    S = 2
    canvas = Image.new("L", (w * S, h * S), 0)
    d = ImageDraw.Draw(canvas)
    ys, xs = np.where(mask > 0.5)
    if len(xs) == 0:
        return np.zeros((h, w), dtype=np.float32)
    n_arcs = int(len(xs) / 90 * density)
    for _ in range(n_arcs):
        i = rnd.randrange(len(xs))
        cx, cy = int(xs[i]), int(ys[i])
        r = rnd.randint(7, 46)
        a0 = rnd.uniform(0, 360)
        d.arc(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), a0, a0 + rnd.uniform(18, 85),
              fill=int(rnd.uniform(16, 54) * strength), width=S)
    for _ in range(int(len(xs) / 7000 * density)):
        i = rnd.randrange(len(xs))
        x, y = int(xs[i]), int(ys[i])
        ang = rnd.uniform(-0.6, 0.6) + rnd.choice((0, 0, math.pi / 2))
        L = rnd.randint(50, 200)
        d.line((x * S, y * S, (x + math.cos(ang) * L) * S, (y + math.sin(ang) * L) * S),
               fill=int(rnd.uniform(40, 95) * strength), width=max(1, S // 2))
    return blur(np.asarray(canvas.resize((w, h), Image.LANCZOS), dtype=np.float32) / 255.0, 0.45)


# ------------------------------------------------------------------ effects
def fx_scratch(img, mask, seed=1):
    """Swirls, scratches and muddy reflections on painted panels."""
    h, w = mask.shape
    soft = blur(img, 7)
    dull = img * 0.45 + soft * 0.55
    gray = dull.mean(axis=2, keepdims=True)
    dull = (dull * 0.82 + gray * 0.18) * 0.93 + 16
    dull = screen(dull, swirl_layer(h, w, mask, seed, 1.5, 1.35), 1.0)
    return mix(img, dull, mask)


def fx_grime(img, mask, seed=2, amount=1.0):
    """Road film, spray streaks and water spots."""
    h, w = mask.shape
    n = fbm(h, w, seed)
    st = streaks(h, w, seed + 7, cols=520)
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    dens = np.clip((n - 0.28) * 2.0 + yy * 0.85 + (st - 0.5) * 0.45 - 0.22, 0, 1) * amount
    dens = blur(dens, 6)
    tone = np.array([112, 94, 76], dtype=np.float32)
    film = img * (1 - 0.70 * dens[..., None]) + tone * 0.70 * dens[..., None]
    # water spots: light centre, dark rim
    rnd = random.Random(seed)
    spots = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(spots)
    ys, xs = np.where(mask > 0.6)
    for _ in range(420):
        i = rnd.randrange(len(xs))
        x, y, r = int(xs[i]), int(ys[i]), rnd.randint(3, 11)
        d.ellipse((x - r, y - r, x + r, y + r), outline=150, width=2)
    sp = blur(np.asarray(spots, dtype=np.float32) / 255.0, 0.8)
    film = film * (1 - 0.35 * sp[..., None]) + tone * 0.35 * sp[..., None]
    return mix(img, film, mask)


def fx_transfer(img, mask, seed=3):
    """Paint transfer / scuff marks: smeared dark rubber and a little coloured paint."""
    h, w = mask.shape
    rnd = random.Random(seed)
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    palette = [(40, 36, 36), (40, 36, 36), (52, 48, 46), (150, 38, 36), (40, 62, 140)]
    for _ in range(16):
        x = rnd.randint(560, 1380)
        y = rnd.randint(480, 880)
        ang = rnd.uniform(-0.3, 0.3)
        L = rnd.randint(140, 420)
        col = rnd.choice(palette)
        pts = [(x + math.cos(ang) * t + rnd.uniform(-5, 5), y + math.sin(ang) * t + rnd.uniform(-5, 5)) for t in range(0, L, 16)]
        d.line(pts, fill=col + (rnd.randint(90, 170),), width=rnd.randint(16, 40), joint="curve")
    lay = np.asarray(layer, dtype=np.float32)
    tex = 0.35 + 0.9 * fbm(h, w, seed + 2, octaves=6, base=22)
    a = blur(lay[..., 3] / 255.0, 4.5) * np.clip(tex, 0, 1) * mask
    dirty = img * (1 - a[..., None]) + lay[..., :3] * a[..., None]
    scratches = mask * smooth(blur(a, 22), 0.015, 0.14)
    return screen(dirty, swirl_layer(h, w, scratches, seed, 0.9, 1.9), 1.0)


def fx_dent(img, cx, cy, R, seed=4):
    """A shallow dent: a soft crater with a dark upper-left rim and a light lower-right rim."""
    h, w = img.shape[:2]
    Y, X = np.mgrid[0:h, 0:w].astype(np.float32)
    dx, dy = X - cx, Y - cy
    r2 = (dx / R) ** 2 + (dy / (R * 0.85)) ** 2
    k = np.exp(-r2 * 1.8)                       # soft bowl
    ring = np.exp(-((np.sqrt(r2) - 0.75) ** 2) * 9)  # rim where the surface bends most
    # slight pinch so any reflection lines bend a little
    s_ = 1.0 + 0.35 * k
    out = np.stack([map_coordinates(img[..., c], [cy + dy * s_, cx + dx * s_], order=1, mode="nearest") for c in range(3)], axis=2)
    light = -(dx + dy) / (R * 1.4)               # + toward the lower-right
    shade = ring * light * 0.30 - k * 0.07       # bright/dark rims, slightly darker bowl
    return out * (1 + shade[..., None])


def fx_seat(img, mask, seed=5):
    """Stained, dull leather."""
    h, w = mask.shape
    n = fbm(h, w, seed, base=5)
    n2 = fbm(h, w, seed + 3, octaves=6, base=14)
    blot = np.clip((n - 0.40) * 5.0, 0, 1) * np.clip(n2 * 1.8, 0.4, 1)
    gray = img.mean(axis=2, keepdims=True)
    dull = img * 0.62 + gray * 0.38
    hi = np.clip(lum(dull) - 150, 0, None)[..., None]
    dull = dull - hi * 0.85            # flatten the shine
    dull = dull * (1 - 0.75 * blot[..., None]) + np.array([48, 26, 20], dtype=np.float32) * 0.75 * blot[..., None]
    # oily dark film along the seams
    dull = dull * 0.88
    return mix(img, dull, mask)


def fx_dust(img, mask, seed=6):
    """Dust film, fingerprints and a lifted, dull look on dark trim."""
    h, w = mask.shape
    rnd = random.Random(seed)
    n = fbm(h, w, seed, base=8)
    dust = (0.35 + 0.65 * n)
    dull = img * 0.62 + np.array([170, 166, 160], dtype=np.float32) * 0.38 * dust[..., None]
    sm = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(sm)
    ys, xs = np.where(mask > 0.6)
    for _ in range(70):
        i = rnd.randrange(len(xs))
        x, y = int(xs[i]), int(ys[i])
        rx, ry = rnd.randint(16, 60), rnd.randint(10, 34)
        d.ellipse((x - rx, y - ry, x + rx, y + ry), fill=rnd.randint(40, 100))
    sm = blur(np.asarray(sm, dtype=np.float32) / 255.0, 6)
    dull = dull + sm[..., None] * 90
    # fine dust specks
    sp = Image.new("L", (w, h), 0)
    ds = ImageDraw.Draw(sp)
    for _ in range(9000):
        i = rnd.randrange(len(xs))
        x, y = int(xs[i]), int(ys[i])
        ds.point((x, y), fill=rnd.randint(120, 230))
    spk = blur(np.asarray(sp, dtype=np.float32) / 255.0, 0.7)
    dull = screen(dull, spk, 0.85)
    return mix(img, dull, mask)


def fx_tint(img, mask):
    """Untinted glass: much lighter, bluish and washed out."""
    lift = img * 0.40 + np.array([112, 128, 152], dtype=np.float32)
    gray = lift.mean(axis=2, keepdims=True)
    lift = lift * 0.75 + gray * 0.25
    return mix(img, lift, mask)


def fx_headliner(img, mask, seed=7):
    """Sagging, stained roof lining."""
    h, w = mask.shape
    n = fbm(h, w, seed, base=4)
    n2 = fbm(h, w, seed + 5, octaves=6, base=12)
    blot = np.clip((n - 0.42) * 3.6, 0, 1) * np.clip(n2 * 1.5, 0.4, 1)
    stain = np.array([168, 132, 76], dtype=np.float32)
    dirty = img * (1 - 0.62 * blot[..., None]) + stain * 0.62 * blot[..., None]
    # darker ring around each stain
    ring = np.clip(blur(blot, 3) - blot * 0.8, 0, 1)
    dirty = dirty * (1 - 0.35 * ring[..., None])
    dirty = dirty * 0.96 + 4
    return mix(img, dirty, mask)


def fx_oxid(img, mask, seed=8):
    """Oxidised paint: chalky, faded, uneven."""
    h, w = mask.shape
    n = fbm(h, w, seed, base=5)
    a = np.clip(0.30 + 0.55 * n, 0, 1)
    chalk = np.array([176, 186, 204], dtype=np.float32)
    dull = img * (1 - 0.55 * a[..., None]) + chalk * 0.55 * a[..., None]
    dull = blur(dull, 1.6) * 0.8 + dull * 0.2
    return mix(img, dull, mask)


# ------------------------------------------------------------------ pairs
def color_mask(img, kind):
    r, g, b = img[..., 0], img[..., 1], img[..., 2]
    if kind == "red":
        m = (r > 95) & (r > g * 1.7) & (r > b * 1.7)
    elif kind == "blue":
        soft = smooth(b - r * 1.2, 8, 40) * smooth(b, 45, 80)
        return blur(soft.astype(np.float32), 3.5)
    else:
        raise ValueError(kind)
    return blur(m.astype(np.float32), 2.5)


def build(name):
    img = load(name)
    h, w = img.shape[:2]
    if name == "scratch":
        m = color_mask(img, "red")
        return fx_scratch(img, m, 11), crisp(img, m), m
    if name == "grime":
        m = poly_mask(h, w, [[(360, 330), (1600, 300), (1600, 1067), (300, 1067)]], 10) * smooth(lum(img), 95, 130)
        return fx_grime(img, m, 12), crisp(img, m, 0.4, 1.04), m
    if name == "transfer":
        m = poly_mask(h, w, [[(460, 0), (1600, 0), (1600, 1068), (420, 1068)]], 8) * smooth(lum(img), 130, 175)
        return fx_transfer(img, m, 13), img, m
    if name == "dent":
        m = np.zeros((h, w), dtype=np.float32)
        return fx_dent(img, 940, 940, 200), img, m
    if name == "seat":
        m = color_mask(img, "red")
        return fx_seat(img, m, 15), crisp(img, m, 0.5, 1.08), m
    if name == "dust":
        m = poly_mask(h, w, [[(0, 0), (1280, 0), (1180, 1067), (0, 1067)]], 40)
        return fx_dust(img, m, 16), img, m
    if name == "tint":
        m = poly_mask(h, w, TINT_POLYS, 5) * smooth(255 - lum(img), 130, 215)
        return fx_tint(img, m), img, m
    if name == "headliner":
        m = poly_mask(h, w, [[(0, 0), (1600, 0), (1600, 980), (1000, 1060), (500, 1000), (0, 1120)]], 18)
        return fx_headliner(img, m, 17), img, m
    if name == "oxid":
        m = color_mask(img, "blue")
        return fx_oxid(img, m, 18), crisp(img, m, 0.5, 1.06), m
    raise ValueError(name)


# window polygons for the tint photo (source px; verified with PREVIEW=1)
TINT_POLYS = [
    [(1090, 250), (1560, 150), (1600, 170), (1600, 760), (1240, 800), (1000, 840), (960, 780)],
    [(560, 330), (980, 250), (960, 780), (560, 940)],
]

NAMES = ["scratch", "grime", "transfer", "dent", "seat", "dust", "tint", "headliner", "oxid"]

if __name__ == "__main__":
    for name in sys.argv[1:] or NAMES:
        before, after, mask = build(name)
        save(before, f"ba-{name}-before.jpg")
        save(after, f"ba-{name}-after.jpg")
        if PREVIEW:
            ov = after * (1 - 0.5 * mask[..., None]) + np.array([255, 0, 80], dtype=np.float32) * 0.5 * mask[..., None]
            Image.fromarray(np.clip(ov, 0, 255).astype(np.uint8)).resize((after.shape[1] // 2, after.shape[0] // 2)).save(
                os.path.join(PREV_DIR, f"mask2_{name}.jpg"), quality=80)
        print("built", name)
