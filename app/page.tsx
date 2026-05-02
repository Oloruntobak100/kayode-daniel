import HomeClient from "./HomeClient";
import { getPortfolioShowcaseProjectsWithMeta } from "@/lib/portfolio-projects";

/** Always fetch showcase projects at request time so admin updates appear without redeploying. */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Home() {
  const { projects, source } = await getPortfolioShowcaseProjectsWithMeta();

  return (
    <HomeClient showcaseProjects={projects} portfolioSource={source} />
  );
}
