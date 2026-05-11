import sharp from "sharp";
import { keywordToSimpleIconsSlug } from "@/lib/simple-icons-slugs";
import {
  FIVERR_GIG_BANNER_HEIGHT,
  FIVERR_GIG_BANNER_WIDTH,
} from "@/lib/gig-banner-prompt";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Word-wrap title into lines for SVG rendering (exact spelling preserved). */
function wrapTitleLines(title: string, maxCharsPerLine: number): string[] {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (lines.length >= 4) break;
    const candidate = cur ? `${cur} ${w}` : w;
    if (candidate.length <= maxCharsPerLine) {
      cur = candidate;
    } else {
      if (cur) {
        lines.push(cur);
        cur = "";
      }
      if (lines.length >= 4) break;
      if (w.length > maxCharsPerLine) {
        lines.push(`${w.slice(0, Math.max(1, maxCharsPerLine - 1))}…`);
      } else {
        cur = w;
      }
    }
  }
  if (cur && lines.length < 4) lines.push(cur);
  return lines.slice(0, 4);
}

async function fetchIconPng(slug: string, size: number): Promise<Buffer | null> {
  const url = `https://cdn.simpleicons.org/${slug}/ffffff`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return await sharp(buf).resize(size, size).png().toBuffer();
  } catch {
    return null;
  }
}

/**
 * Fal outputs atmosphere only; we draw exact headline text + Simple Icons marks.
 */
export async function composeGigBanner(
  backgroundBuffer: Buffer,
  title: string,
  keywords: string[]
): Promise<Buffer> {
  const W = FIVERR_GIG_BANNER_WIDTH;
  const H = FIVERR_GIG_BANNER_HEIGHT;

  const uniqueSlugs = Array.from(
    new Set(keywords.map(keywordToSimpleIconsSlug).filter((s) => s.length > 0))
  ).slice(0, 8);

  const n = uniqueSlugs.length;
  const iconSize = n > 6 ? 42 : n > 4 ? 46 : 52;
  const gap = 14;

  const composites: sharp.OverlayOptions[] = [];

  const vignetteSvg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#020617" stop-opacity="0.78"/>
          <stop offset="0.38" stop-color="#020617" stop-opacity="0.22"/>
          <stop offset="0.62" stop-color="#020617" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${Math.round(W * 0.58)}" height="${H}" fill="url(#vig)"/>
    </svg>`
  );
  composites.push({ input: vignetteSvg, left: 0, top: 0 });

  const iconBuffers: Buffer[] = [];
  for (const slug of uniqueSlugs) {
    const png = await fetchIconPng(slug, iconSize);
    if (png) iconBuffers.push(png);
  }

  const cols = 2;
  const count = iconBuffers.length;
  const rows = count ? Math.ceil(count / cols) : 0;
  if (count > 0 && rows > 0) {
    const panelWidth = cols * iconSize + (cols - 1) * gap;
    const panelHeight = rows * iconSize + (rows - 1) * gap;
    const startX = W - 52 - panelWidth;
    const startY = Math.max(52, (H - panelHeight) / 2);

    iconBuffers.forEach((png, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      composites.push({
        input: png,
        left: Math.round(startX + col * (iconSize + gap)),
        top: Math.round(startY + row * (iconSize + gap)),
      });
    });
  }

  const t = title.trim();
  const fontSize =
    t.length > 100 ? 28 : t.length > 70 ? 32 : t.length > 48 ? 36 : 42;
  const maxChars =
    fontSize <= 30 ? 26 : fontSize <= 34 ? 28 : fontSize <= 36 ? 30 : 32;
  const lines = wrapTitleLines(t, maxChars);
  const lineHeight = Math.round(fontSize * 1.22);
  const padY = 20;
  const padX = 24;
  const blockLeft = 48;
  const blockTop = 72;
  const blockWidth =
    count > 0 ? Math.min(640, Math.round(W * 0.48)) : Math.min(760, W - 96);
  const textBlockHeight = lines.length * lineHeight + padY * 2;
  const blockHeight = textBlockHeight;

  const textStartX = blockLeft + padX;
  const firstBaseline = blockTop + padY + Math.round(fontSize * 0.85);

  const tspans = lines
    .map((line, i) => {
      if (i === 0) {
        return `<tspan x="${textStartX}" y="${firstBaseline}">${escapeXml(line)}</tspan>`;
      }
      return `<tspan x="${textStartX}" dy="${lineHeight}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  const titleSvg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${blockLeft}" y="${blockTop}" width="${blockWidth}" height="${blockHeight}" rx="18"
        fill="rgba(2,6,23,0.55)" stroke="rgba(56,189,248,0.22)" stroke-width="2"/>
      <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-weight="700" font-size="${fontSize}" fill="#f8fafc" letter-spacing="-0.03em">${tspans}</text>
    </svg>`
  );
  composites.push({ input: titleSvg, left: 0, top: 0 });

  /** Fal may return ± a few pixels; overlays are WxH — normalize base first or Sharp errors. */
  const normalizedBg = await sharp(backgroundBuffer)
    .resize(W, H, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .toBuffer();

  return sharp(normalizedBg)
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toBuffer();
}
