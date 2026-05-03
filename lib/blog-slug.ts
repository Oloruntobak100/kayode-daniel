/** URL-safe slug: lowercase letters, numbers, single hyphens between tokens */
export function isValidBlogSlug(s: string): boolean {
  return (
    s.length >= 1 &&
    s.length <= 200 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)
  );
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}
