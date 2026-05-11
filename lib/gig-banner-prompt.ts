/** Fiverr gig image / cover recommended size */
export const FIVERR_GIG_BANNER_WIDTH = 1280;
export const FIVERR_GIG_BANNER_HEIGHT = 769;

export function parseGigKeywords(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

/**
 * Builds a Flux prompt for a minimal, marketplace-style gig cover.
 * Keywords drive recognizable tech-brand logo marks in one calm row.
 */
export function buildGigBannerPrompt(title: string, keywords: string[]): string {
  const safeTitle = title.trim().slice(0, 140);
  const kws = keywords.slice(0, 6);

  const logoInstruction =
    kws.length > 0
      ? `Along the bottom edge, one horizontal row of small authentic-looking official brand logos for: ${kws.join(", ")}. ` +
        `Each logo crisp and recognizable, evenly spaced, sitting on the background with subtle breathing room — not overlapping the headline. ` +
        `Use true brand colors where appropriate. No invented fake icons.`
      : `No logos or icons; stay abstract — at most one soft gradient orb or a single thin accent line for depth.`;

  return (
    `Professional Fiverr gig cover banner, wide cinematic frame. ` +
    `Ultra-clean editorial layout: mostly negative space, subtle premium gradient background ` +
    `(deep slate, charcoal, or cool blue-gray — smooth, not noisy). ` +
    `No busy illustrations, no screenshots, no device mocks, no QR codes, no watermarks, no small paragraph text. ` +
    `One bold hero headline in modern geometric sans-serif, high readability, strong contrast: ` +
    `the exact phrase "${safeTitle}". ` +
    `Headline placed in upper-left or center-left for balance; sleek, confident, click-worthy consultancy vibe. ` +
    logoInstruction +
    ` Minimal elements overall — magazine-quality, sparse, expensive-looking.`
  );
}
