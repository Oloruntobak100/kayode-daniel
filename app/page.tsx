import HomeClient from "./HomeClient";
import { getPublishedBlogListWithMeta } from "@/lib/blog";
import { getPortfolioShowcaseProjectsWithMeta } from "@/lib/portfolio-projects";

/** Always fetch showcase projects at request time so admin updates appear without redeploying. */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Home() {
  const { projects, source } = await getPortfolioShowcaseProjectsWithMeta();
  const blog = await getPublishedBlogListWithMeta();

  return (
    <HomeClient
      showcaseProjects={projects}
      portfolioSource={source}
      blogPosts={blog.posts}
      blogSource={blog.source}
    />
  );
}
