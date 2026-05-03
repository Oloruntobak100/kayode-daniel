const YT_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "m.youtube.com",
  "www.youtube-nocookie.com",
  "youtu.be",
]);

/** Extract 11-char video id from common YouTube URL shapes. */
export function extractYouTubeVideoId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (!YT_HOSTS.has(u.hostname)) return null;
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (u.pathname === "/watch") {
      const v = u.searchParams.get("v");
      return v && /^[\w-]{11}$/.test(v) ? v : null;
    }
    const m = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
    if (m?.[2]) return m[2];
  } catch {
    return null;
  }
  return null;
}

export function isYouTubeUrl(input: string): boolean {
  return extractYouTubeVideoId(input) !== null;
}

export function youTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function youTubeEmbedUrl(
  videoId: string,
  opts: { autoplay?: boolean; mute?: boolean; playsinline?: boolean } = {}
): string {
  const { autoplay = true, mute = true, playsinline = true } = opts;
  const p = new URLSearchParams();
  if (autoplay) p.set("autoplay", "1");
  if (mute) p.set("mute", "1");
  if (playsinline) p.set("playsinline", "1");
  return `https://www.youtube-nocookie.com/embed/${videoId}?${p.toString()}`;
}
