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
 * Flux draws **only** the atmospheric background. Headline text and tech logos are
 * composited afterward (exact spelling + Simple Icons) — image models garble text.
 */
export function buildGigBannerBackgroundPrompt(): string {
  return (
    `Professional wide abstract background for a tech consulting marketplace gig cover. ` +
    `Dark navy and charcoal gradient, subtle cyber editorial mood, soft vignette, faint diagonal light rays or mesh gradient, ` +
    `premium SaaS infographic backdrop feel — suitable behind crisp white typography and icons. ` +
    `Absolutely NO text, NO letters, NO numbers, NO words, NO subtitles, NO logos, NO icons, NO brand marks, NO symbols, ` +
    `NO UI screenshots, NO faces, NO photos, NO watermarks. Atmospheric empty canvas only.`
  );
}
