type Level = "info" | "warn" | "error" | "debug";

// Very small logger to keep console output consistent and avoid leaking secrets.
// It redacts obvious secret-bearing keys when stringifying meta objects.
export function log(level: Level, message: string, meta?: Record<string, unknown>) {
  const safeMeta = meta ? redact(meta) : undefined;
  const payload = { level, message, ...safeMeta, ts: new Date().toISOString() };
  // Use console.log for all levels to keep output visible in Vercel/Next logs.
  console.log(JSON.stringify(payload));
}

function redact(meta: Record<string, unknown>) {
  const redactedKeys = ["token", "secret", "authorization", "cookie", "code"];
  const clone: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (redactedKeys.some((k) => key.toLowerCase().includes(k))) {
      clone[key] = "[redacted]";
    } else {
      clone[key] = value;
    }
  }
  return clone;
}