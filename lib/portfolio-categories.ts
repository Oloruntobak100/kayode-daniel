import { projectPortfolioCategories } from "@/lib/portfolio-source";

/** Category ids allowed when saving a project (excludes "all") */
export const showcaseCategoryIds = projectPortfolioCategories
  .filter((c) => c.id !== "all")
  .map((c) => c.id);

export function isValidShowcaseCategoryId(id: string): boolean {
  return showcaseCategoryIds.includes(id as (typeof showcaseCategoryIds)[number]);
}
