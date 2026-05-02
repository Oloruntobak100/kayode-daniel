import type { ProjectPortfolioCategoryId } from "@/lib/portfolio-source";

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
  image_url: string;
  sort_order: number | null;
};

export function rowToShowcase(row: PortfolioProjectRow): ShowcaseProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    categoryId: row.category_id as ShowcaseProject["categoryId"],
    imageSrc: row.image_url,
    contentImageUrl: row.content_image_url,
  };
}
