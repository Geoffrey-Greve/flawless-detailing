"""
Builds before/after image pairs for the home slider.
Run:  python scripts/make-before-after.py [front hood lens]   (needs pillow + numpy)
Inputs: glossy-black.jpg, mclaren.jpg, headlights-old.jpg in public/images.

After  = the clean stock photo (lightly enhanced inside the serviced area).
Before = the same photo with realistic defects ONLY inside the serviced area:
         paint -> swirl marks, hairline scratches, muddy reflections, lifted blacks;
         lens  -> yellowing + milky oxidation.
Everything outside the mask is pixel-identical in both images.
"""
import math, os, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
SRC = ROOT
OUT = ROOT
PREVIEW = os.environ.get("PREVIEW") == "1"      # PREVIEW=1 writes mask overlays instead of images
PREV_DIR = os.environ.get("TEMP", ".")

DISP = 1.2  # coordinates below were read from a 1333-wide preview of the 1600-wide originals


def poly_mask(size, polys, feather=5, shrink_blur=0):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon([(x * DISP, y * DISP) for x, y in p], fill=255)
    if feather:
        m = m.filter(ImageFilter.GaussianBlur(feather))
    return np.asarray(m, dtype=np.float32) / 255.0


def ellipse_mask(size, ellipses, feather=6):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    for cx, cy, rx, ry in ellipses:
        cx, cy, rx, ry = cx * DISP, cy * DISP, rx * DISP, ry * DISP
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(feather))
    return np.asarray(m, dtype=np.float32) / 255.0


def swirl_layer(size, bbox, seed, density=1.0, strength=1.0):
    """Light-coloured micro-scratch arcs + a few longer scratches, on a black canvas."""
    rnd = random.Random(seed)
    w, h = size
    S = 2  # draw at 2x then downsample for anti-aliasing
    canvas = Image.new("L", (w * S, h * S), 0)
    d = ImageDraw.Draw(canvas)
    x0, y0, x1, y1 = [int(v * DISP) for v in bbox]
    # fine, short, circular micro-scratches: what real swirl marks look like under light
    n_arcs = int(11000 * density)
    for _ in range(n_arcs):
        cx = rnd.randint(x0, x1)
        cy = rnd.randint(y0, y1)
        r = rnd.randint(7, 46)
        a0 = rnd.uniform(0, 360)
        sweep = rnd.uniform(18, 85)
        v = int(rnd.uniform(16, 54) * strength)
        d.arc(
            ((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S),
            a0,
            a0 + sweep,
            fill=v,
            width=S,
        )
    # a handful of slightly deeper hairline scratches
    for _ in range(int(22 * density)):
        x = rnd.randint(x0, x1)
        y = rnd.randint(y0, y1)
        ang = rnd.uniform(-0.5, 0.5) + rnd.choice((0, 0, math.pi / 2))
        L = rnd.randint(40, 170)
        v = int(rnd.uniform(40, 95) * strength)
        d.line((x * S, y * S, (x + math.cos(ang) * L) * S, (y + math.sin(ang) * L) * S), fill=v, width=max(1, S // 2))
    canvas = canvas.resize((w, h), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.45))
    return np.asarray(canvas, dtype=np.float32) / 255.0


def blur_np(arr, radius):
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32)


def paint_defects(base, mask, seed, bbox, haze=0.5, lift=16, desat=0.18, swirl_strength=1.0, density=1.0):
    """Return the 'before' version of a painted area."""
    img = base.astype(np.float32)
    m = mask[..., None]
    # muddy reflections: clear-coat damage scatters light, so reflections lose their edge
    soft = blur_np(img, 7)
    dull = img * (1 - haze) + soft * haze
    # lifted blacks + slight desaturation (oxidation / haze)
    gray = dull.mean(axis=2, keepdims=True)
    dull = dull * (1 - desat) + gray * desat
    dull = dull * 0.94 + lift
    # swirl marks & scratches (screen blend so they read on dark paint)
    sw = swirl_layer((base.shape[1], base.shape[0]), bbox, seed, density, swirl_strength)[..., None]
    sw = sw * 255.0 * (0.55 + 0.45 * (blur_np(img, 12).mean(axis=2, keepdims=True) / 255.0 + 0.25))
    dull = 255.0 - (255.0 - dull) * (255.0 - sw) / 255.0
    out = img * (1 - m) + dull * m
    return np.clip(out, 0, 255)


def paint_after(base, mask, boost=0.12):
    """Gloss lift inside the serviced area: a touch more contrast and crispness."""
    img = base.astype(np.float32)
    m = mask[..., None]
    mean = img.mean(axis=(0, 1), keepdims=True)
    crisp = (img - blur_np(img, 2.2)) * 0.8 + img
    glossy = (crisp - mean) * (1 + boost) + mean
    out = img * (1 - m) + glossy * m
    return np.clip(out, 0, 255)


def lens_before(base, mask):
    img = base.astype(np.float32)
    m = mask[..., None]
    soft = blur_np(img, 4)
    foggy = img * 0.55 + soft * 0.45
    yellow = np.array([232, 200, 118], dtype=np.float32)   # oxidised polycarbonate
    foggy = foggy * 0.62 + yellow * 0.38
    foggy = foggy * 0.88 + 24                                # milky, low contrast
    out = img * (1 - m) + foggy * m
    return np.clip(out, 0, 255)


def lens_after(base, mask):
    img = base.astype(np.float32)
    m = mask[..., None]
    # neutralise the warm cast, restore depth and sparkle
    r, g, b = img[..., 0:1], img[..., 1:2], img[..., 2:3]
    cool = np.concatenate([r * 0.94, g * 0.99, b * 1.08], axis=2)
    cool = (cool - 112) * 1.28 + 106
    crisp = (cool - blur_np(cool, 2.0)) * 1.1 + cool
    out = img * (1 - m) + crisp * m
    return np.clip(out, 0, 255)


def save(arr, name):
    Image.fromarray(arr.astype(np.uint8)).save(os.path.join(OUT, name), quality=86, optimize=True)


def preview(base, mask, name):
    img = base.astype(np.float32)
    tint = np.array([255, 0, 80], dtype=np.float32)
    ov = img * (1 - 0.55 * mask[..., None]) + tint * 0.55 * mask[..., None]
    Image.fromarray(ov.astype(np.uint8)).resize((base.shape[1] // 2, base.shape[0] // 2)).save(
        os.path.join(PREV_DIR, f"mask_{name}.jpg"), quality=80
    )


def load(name):
    im = Image.open(os.path.join(SRC, name)).convert("RGB")
    return im


# ---------------------------------------------------------------- pair 1: car front
def pair_front():
    im = load("glossy-black.jpg")
    base = np.asarray(im)
    hood = [(95, 835), (300, 700), (540, 555), (700, 430), (1330, 470), (1330, 805), (1210, 960), (1020, 1135), (820, 1078), (580, 968)]
    fender = [(830, 1100), (1025, 1142), (1010, 1330), (730, 1335), (610, 1220), (700, 1160)]
    mask = poly_mask(im.size, [hood, fender], feather=5)
    if PREVIEW:
        preview(base, mask, "front")
        return
    bbox = (60, 430, 1330, 1340)
    before = paint_defects(base, mask, 11, bbox, haze=0.55, lift=18, desat=0.2, swirl_strength=1.15, density=1.2)
    after = paint_after(base, mask, boost=0.12)
    save(before, "ba-front-before.jpg")
    save(after, "ba-front-after.jpg")


# ---------------------------------------------------------------- pair 2: supercar hood
def pair_hood():
    im = load("mclaren.jpg")
    base = np.asarray(im)
    hood = [(230, 1215), (330, 1190), (700, 1185), (1020, 1195), (1105, 1330), (990, 1425), (680, 1470), (380, 1450), (230, 1340)]
    mask = poly_mask(im.size, [hood], feather=5)
    if PREVIEW:
        preview(base, mask, "hood")
        return
    bbox = (210, 1180, 1120, 1480)
    before = paint_defects(base, mask, 23, bbox, haze=0.6, lift=20, desat=0.22, swirl_strength=1.2, density=1.5)
    after = paint_after(base, mask, boost=0.10)
    save(before, "ba-hood-before.jpg")
    save(after, "ba-hood-after.jpg")


# ---------------------------------------------------------------- pair 3: headlights
def pair_lens():
    im = load("headlights-old.jpg")
    base = np.asarray(im)
    mask = ellipse_mask(im.size, [(447, 805, 205, 208), (918, 815, 208, 212)], feather=5)
    if PREVIEW:
        preview(base, mask, "lens")
        return
    save(lens_before(base, mask), "ba-lens-before.jpg")
    save(lens_after(base, mask), "ba-lens-after.jpg")


if __name__ == "__main__":
    which = sys.argv[1:] or ["front", "hood", "lens"]
    for w in which:
        {"front": pair_front, "hood": pair_hood, "lens": pair_lens}[w]()
    print("done", which, "preview" if PREVIEW else "build")
