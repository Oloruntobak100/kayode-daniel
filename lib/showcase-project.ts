import type { ProjectPortfolioCategoryId } from "@/lib/portfolio-source";
import { SHOWCASE_CARD_FALLBACK_SRC } from "@/lib/showcase-card-image";

/** Unified shape for Projects UI — from Supabase or static fallback */
export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  categoryId: ProjectPortfolioCategoryId;
  imageSrc: string;
  /** Optional detail / gallery image shown in the project dialog */
  contentImageUrl: string | null;
};

export type PortfolioProjectRow = {
  id: string;
  title: string;
  description: string | null;
  content_image_url: string | null;
  category_id: string;
  image_url: string | null;
  sort_order: number | null;
};

export function rowToShowcase(row: PortfolioProjectRow): ShowcaseProject {
  const thumb = row.image_url?.trim();
  const content = row.content_image_url?.trim();
  /** No separate “thumbnail” in admin: grid uses detail image, then local fallback. */
  const imageSrc = thumb || content || SHOWCASE_CARD_FALLBACK_SRC;
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    categoryId: row.category_id as ShowcaseProject["categoryId"],
    imageSrc,
    contentImageUrl: row.content_image_url,
  };
}
