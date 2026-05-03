import { portfolioShowcaseProjects } from "@/lib/portfolio-source";
import type { ShowcaseProject } from "@/lib/showcase-project";
import { rowToShowcase } from "@/lib/showcase-project";
import { createServiceRoleClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type PortfolioProjectsSource = "supabase" | "static";

function staticFallback(): ShowcaseProject[] {
  const ordinalInCategory = new Map<string, number>();
  return portfolioShowcaseProjects.map((p) => {
    const next = ordinalInCategory.get(p.categoryId) ?? 0;
    ordinalInCategory.set(p.categoryId, next + 1);
    return {
      id: p.id,
      title: p.title,
      description: "",
      categoryId: p.categoryId,
      sortOrder: next,
      imageSrc: p.imageSrc,
      contentImageUrl: null,
      youtubeUrl: null,
      projectUrl: null,
    };
  });
}

export async function getPortfolioShowcaseProjects(): Promise<ShowcaseProject[]> {
  const { projects } = await getPortfolioShowcaseProjectsWithMeta();
  return projects;
}

/**
 * Server-only: loads projects from Supabase when configured; otherwise static showcase list.
 */
export async function getPortfolioShowcaseProjectsWithMeta(): Promise<{
  projects: ShowcaseProject[];
  source: PortfolioProjectsSource;
}> {
  if (!isSupabaseConfigured()) {
    return { projects: staticFallback(), source: "static" };
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return { projects: staticFallback(), source: "static" };
  }

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(
      "id, title, description, content_image_url, youtube_url, project_url, category_id, image_url, sort_order"
    )
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return { projects: staticFallback(), source: "static" };
  }

  if (!data?.length) {
    return { projects: [], source: "supabase" };
  }

  return {
    projects: data.map((row) =>
      rowToShowcase({
        id: row.id,
        title: row.title,
        description: row.description,
        content_image_url: row.content_image_url,
        youtube_url: row.youtube_url,
        project_url: row.project_url,
        category_id: row.category_id,
        image_url: row.image_url,
        sort_order: row.sort_order,
      })
    ),
    source: "supabase",
  };
}
