const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

/** Seconds to SMPTE-style HH:MM:SS:FF at 25 fps. */
export function timecode(seconds: number, fps = 25): string {
  const s = Math.max(0, seconds);
  const frames = Math.floor((s % 1) * fps);
  return `${pad(s / 3600)}:${pad((s % 3600) / 60)}:${pad(s % 60)}:${pad(frames)}`;
}

/** "19:54" or "1:00" to an ISO 8601 duration such as PT19M54S. */
export function isoDuration(runtime: string): string {
  const [m, s] = runtime.split(":").map(Number);
  return `PT${m}M${s}S`;
}
