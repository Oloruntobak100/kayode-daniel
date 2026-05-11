/**
 * Map user-entered tech keywords to Simple Icons CDN slugs.
 * @see https://simpleicons.org/
 */
const KEYWORD_TO_SLUG: Record<string, string> = {
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  next: "nextdotjs",
  react: "react",
  "react.js": "react",
  reactjs: "react",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  vercel: "vercel",
  node: "nodedotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  stripe: "stripe",
  supabase: "supabase",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  aws: "amazonaws",
  cloudflare: "cloudflare",
  mongodb: "mongodb",
  postgres: "postgresql",
  postgresql: "postgresql",
  prisma: "prisma",
  git: "git",
  github: "github",
  flutter: "flutter",
  capacitor: "capacitor",
  ionic: "ionic",
  redis: "redis",
  nginx: "nginx",
  clerk: "clerk",
  auth0: "auth0",
};

export function keywordToSimpleIconsSlug(keyword: string): string {
  const k = keyword.trim().toLowerCase();
  if (!k) return "";
  if (KEYWORD_TO_SLUG[k]) return KEYWORD_TO_SLUG[k];
  const squashed = k.replace(/\s+/g, "");
  if (KEYWORD_TO_SLUG[squashed]) return KEYWORD_TO_SLUG[squashed];
  return k.replace(/[^a-z0-9]/g, "");
}
