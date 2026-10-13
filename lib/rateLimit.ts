/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Good enough for a single Node process (PM2 fork mode / one `next start`).
 * If the site is ever run on several instances, move this to Redis or the DB.
 */
const hits = new Map<string, number[]>();

export function allow(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
