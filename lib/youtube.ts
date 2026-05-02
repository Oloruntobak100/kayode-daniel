/** Extract YouTube video id from common URL shapes */
export function youtubeVideoIdFromUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  try {
    const parsed = new URL(u);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (host.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const m = parsed.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
      if (m?.[2]) return m[2];
    }
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumbnailUrl(videoId: string, quality: "maxres" | "hq" = "maxres"): string {
  const name = quality === "maxres" ? "maxresdefault" : "hqdefault";
  return `https://img.youtube.com/vi/${videoId}/${name}.jpg`;
}
