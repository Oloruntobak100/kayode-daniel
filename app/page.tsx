import HomeClient from "./HomeClient";
import { getPortfolioShowcaseProjectsWithMeta } from "@/lib/portfolio-projects";

/** Always fetch showcase projects at request time so admin updates appear without redeploying. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const { projects, source } = await getPortfolioShowcaseProjectsWithMeta();

  return (
    <HomeClient showcaseProjects={projects} portfolioSource={source} />
  );
}
