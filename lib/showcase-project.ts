import type { ProjectPortfolioCategoryId } from "@/lib/portfolio-source";
import { SHOWCASE_CARD_FALLBACK_SRC } from "@/lib/showcase-card-image";
import { extractYouTubeVideoId, youTubeThumbnailUrl } from "@/lib/youtube";

/** Unified shape for Projects UI — from Supabase or static fallback */
export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  categoryId: ProjectPortfolioCategoryId;
  imageSrc: string;
  /** Optional detail / gallery image shown in the project dialog */
  contentImageUrl: string | null;
  /** YouTube watch URL (dialog embed; card can use official thumbnail) */
  youtubeUrl: string | null;
  /** Live app / case-study link */
  projectUrl: string | null;
};

export type PortfolioProjectRow = {
  id: string;
  title: string;
  description: string | null;
  content_image_url: string | null;
  youtube_url: string | null;
  project_url: string | null;
  category_id: string;
  image_url: string | null;
  sort_order: number | null;
};

export function rowToShowcase(row: PortfolioProjectRow): ShowcaseProject {
  const thumb = row.image_url?.trim();
  const content = row.content_image_url?.trim();
  const yt = row.youtube_url?.trim() ?? "";
  const ytId = extractYouTubeVideoId(yt);
  /** Grid image: uploaded thumb, detail image, YouTube poster, then local fallback. */
  const imageSrc =
    thumb ||
    content ||
    (ytId ? youTubeThumbnailUrl(ytId) : null) ||
    SHOWCASE_CARD_FALLBACK_SRC;
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    categoryId: row.category_id as ShowcaseProject["categoryId"],
    imageSrc,
    contentImageUrl: row.content_image_url,
    youtubeUrl: row.youtube_url?.trim() || null,
    projectUrl: row.project_url?.trim() || null,
  };
}
