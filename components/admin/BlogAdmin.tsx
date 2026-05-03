"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { slugifyTitle } from "@/lib/blog-slug";
import { cn } from "@/lib/utils";

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  reading_time_minutes: number | null;
  published: boolean;
  published_at: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
};

type FormState = {
  id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  reading_time_minutes: string;
  thumbnail_url: string;
  published: boolean;
  published_at: string;
};

function emptyForm(): FormState {
  return {
    id: null,
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    reading_time_minutes: "",
    thumbnail_url: "",
    published: false,
    published_at: "",
  };
}

function siteBaseUrl(): string {
  if (typeof window === "undefined") return "";
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  return window.location.origin;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lastCreatedSlug, setLastCreatedSlug] = useState<string | null>(null);
  const [thumbnailBusy, setThumbnailBusy] = useState<
    "idle" | "upload" | "generate"
  >("idle");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog");
      const json = (await res.json()) as { posts?: BlogPostRow[]; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Failed to load posts");
        return;
      }
      setPosts(json.posts ?? []);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function selectPost(p: BlogPostRow) {
    setForm({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      body: p.body ?? "",
      reading_time_minutes:
        p.reading_time_minutes != null ? String(p.reading_time_minutes) : "",
      thumbnail_url: p.thumbnail_url ?? "",
      published: p.published,
      published_at: p.published_at
        ? p.published_at.slice(0, 16)
        : "",
    });
    setMessage(null);
    setLastCreatedSlug(null);
  }

  function clearForm() {
    setForm(emptyForm());
    setMessage(null);
    setLastCreatedSlug(null);
  }

  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setThumbnailBusy("upload");
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload-blog-thumbnail", {
        method: "POST",
        body: fd,
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setMessage(json.error ?? "Upload failed");
        return;
      }
      if (json.url) {
        setForm((f) => ({ ...f, thumbnail_url: json.url! }));
      }
    } catch {
      setMessage("Upload failed");
    } finally {
      setThumbnailBusy("idle");
    }
  }

  async function handleGenerateThumbnail() {
    const title = form.title.trim();
    if (!title) {
      setMessage("Add a title first — it is used as the image prompt.");
      return;
    }
    setThumbnailBusy("generate");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/generate-blog-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setMessage(json.error ?? "Generation failed");
        return;
      }
      if (json.url) {
        setForm((f) => ({ ...f, thumbnail_url: json.url! }));
        setMessage("Thumbnail generated. Save the post to keep it.");
      }
    } catch {
      setMessage("Generation failed");
    } finally {
      setThumbnailBusy("idle");
    }
  }

  async function copyShareLink(slug: string) {
    const url = `${siteBaseUrl()}/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied to clipboard.");
    } catch {
      setMessage(url);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setLastCreatedSlug(null);

    const slug = form.slug.trim();
    const title = form.title.trim();
    if (!slug || !title) {
      setMessage("Slug and title are required.");
      setSaving(false);
      return;
    }

    const reading =
      form.reading_time_minutes.trim() === ""
        ? null
        : Math.max(0, Number.parseInt(form.reading_time_minutes, 10) || 0);

    const payload: Record<string, unknown> = {
      slug,
      title,
      excerpt: form.excerpt.trim() || null,
      body: form.body,
      reading_time_minutes: reading,
      thumbnail_url: form.thumbnail_url.trim() || null,
      published: form.published,
      published_at: form.published
        ? form.published_at
          ? new Date(form.published_at).toISOString()
          : new Date().toISOString()
        : null,
    };

    try {
      if (form.id) {
        const res = await fetch(`/api/admin/blog/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { error?: string; slug?: string };
        if (!res.ok) {
          setMessage(json.error ?? "Save failed");
          setSaving(false);
          return;
        }
        setMessage("Saved.");
        await load();
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as {
          id?: string;
          slug?: string;
          error?: string;
        };
        if (!res.ok) {
          setMessage(json.error ?? "Create failed");
          setSaving(false);
          return;
        }
        setLastCreatedSlug(json.slug ?? slug);
        setMessage("Created. Copy your share link below.");
        await load();
        if (json.id) {
          setForm((f) => ({
            ...f,
            id: json.id!,
            slug: json.slug ?? f.slug,
          }));
        }
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("Delete this post?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/blog/${form.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setMessage(json.error ?? "Delete failed");
        return;
      }
      clearForm();
      await load();
      setMessage("Deleted.");
    } finally {
      setSaving(false);
    }
  }

  const shareSlug = lastCreatedSlug ?? (form.id ? form.slug : null);
  const shareUrl =
    shareSlug && typeof window !== "undefined"
      ? `${siteBaseUrl()}/blog/${shareSlug}`
      : shareSlug
        ? `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || ""}/blog/${shareSlug}`
        : null;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              All posts
            </h2>
            <button
              type="button"
              onClick={clearForm}
              className="text-xs font-medium text-accent hover:underline"
            >
              New post
            </button>
          </div>
          {loading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted">No posts yet. Create one on the right.</p>
          ) : (
            <ul className="max-h-[min(70vh,520px)] space-y-2 overflow-y-auto pr-1">
              {posts.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectPost(p)}
                    className={cn(
                      "min-h-[48px] w-full touch-manipulation rounded-xl border px-3 py-2.5 text-left text-sm transition",
                      form.id === p.id
                        ? "border-accent/45 bg-accent/10 shadow-soft"
                        : "border-black/10 bg-white/60 hover:border-black/20"
                    )}
                  >
                    <span className="font-medium">{p.title}</span>
                    <span className="mt-0.5 block font-mono text-xs text-muted">
                      /blog/{p.slug}
                      {p.published ? "" : " · draft"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <form
            onSubmit={handleSave}
            className="space-y-5 rounded-2xl border border-black/10 bg-white/65 p-5 shadow-soft backdrop-blur-md md:p-6"
          >
            <h2 className="font-display text-lg font-semibold">
              {form.id ? "Edit post" : "New post"}
            </h2>

            {shareUrl ? (
              <div className="rounded-xl border border-accent/25 bg-accent/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Shareable link
                </p>
                <p className="mt-1 break-all font-mono text-sm">{shareUrl}</p>
                <button
                  type="button"
                  onClick={() => void copyShareLink(shareSlug!)}
                  className="mt-3 rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
                >
                  Copy link
                </button>
              </div>
            ) : null}

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Slug (URL)
              </span>
              <input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                className="w-full rounded-xl border border-black/12 bg-white/90 px-3 py-2 font-mono text-base outline-none ring-accent/30 focus:ring-2 sm:text-sm"
                placeholder="my-post-title"
              />
              <button
                type="button"
                className="text-xs font-medium text-accent hover:underline"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    slug: slugifyTitle(f.title) || f.slug,
                  }))
                }
              >
                Generate from title
              </button>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Title
              </span>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-base outline-none ring-accent/30 focus:ring-2 sm:text-sm"
              />
            </label>

            <div className="space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wide text-muted">
                Thumbnail
              </span>
              <p className="text-xs leading-relaxed text-muted">
                Upload an image or generate one with Fal AI using your title as the
                prompt (engaging cover art, no text in the image).
              </p>
              {form.thumbnail_url ? (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-black/10 bg-black/5">
                  <Image
                    src={form.thumbnail_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-pill border border-black/15 bg-white/80 px-4 py-2 text-sm font-medium transition hover:border-black/25">
                  {thumbnailBusy === "upload" ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    disabled={thumbnailBusy !== "idle"}
                    onChange={(e) => void handleThumbnailUpload(e)}
                  />
                </label>
                <button
                  type="button"
                  disabled={
                    thumbnailBusy !== "idle" || !form.title.trim()
                  }
                  onClick={() => void handleGenerateThumbnail()}
                  className="rounded-pill border border-accent/35 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {thumbnailBusy === "generate"
                    ? "Generating…"
                    : "Generate with Fal AI"}
                </button>
                {form.thumbnail_url ? (
                  <button
                    type="button"
                    disabled={thumbnailBusy !== "idle"}
                    onClick={() =>
                      setForm((f) => ({ ...f, thumbnail_url: "" }))
                    }
                    className="text-sm font-medium text-muted underline-offset-2 hover:underline"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Excerpt
              </span>
              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                rows={2}
                className="w-full resize-y rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-base outline-none ring-accent/30 focus:ring-2 sm:text-sm"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Body (Markdown)
              </span>
              <textarea
                value={form.body}
                onChange={(e) =>
                  setForm((f) => ({ ...f, body: e.target.value }))
                }
                rows={14}
                className="w-full resize-y rounded-xl border border-black/12 bg-white/90 px-3 py-2 font-mono text-sm outline-none ring-accent/30 focus:ring-2"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Reading time (minutes)
              </span>
              <input
                type="number"
                min={0}
                value={form.reading_time_minutes}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    reading_time_minutes: e.target.value,
                  }))
                }
                className="w-full max-w-[12rem] rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-base outline-none ring-accent/30 focus:ring-2 sm:text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      published: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-black/20 text-accent"
                />
                Published
              </label>
              {form.published ? (
                <label className="flex flex-1 flex-col gap-1 sm:min-w-[200px]">
                  <span className="text-xs text-muted">Publish date</span>
                  <input
                    type="datetime-local"
                    value={form.published_at}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        published_at: e.target.value,
                      }))
                    }
                    className="rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
                  />
                </label>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95 disabled:opacity-50"
              >
                {saving ? "Saving…" : form.id ? "Save changes" : "Create post"}
              </button>
              {form.id ? (
                <button
                  type="button"
                  onClick={() => void handleDelete()}
                  disabled={saving}
                  className="rounded-pill border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100 disabled:opacity-50"
                >
                  Delete
                </button>
              ) : null}
            </div>

            {message ? (
              <p className="text-sm text-muted" role="status">
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}
