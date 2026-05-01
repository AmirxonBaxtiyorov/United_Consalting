const hits = new Map<string, { count: number; reset: number }>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true, remaining: MAX_HITS - 1 };
  }
  if (entry.count >= MAX_HITS) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: MAX_HITS - entry.count };
}
