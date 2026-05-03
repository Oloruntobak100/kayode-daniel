"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projectPortfolioCategories } from "@/lib/portfolio-source";
import { showcaseCategoryIds } from "@/lib/portfolio-categories";
import { cn } from "@/lib/utils";

type AdminProject = {
  id: string;
  title: string;
  description: string;
  content_image_url: string | null;
  category_id: string;
  image_url: string | null;
  sort_order: number;
};

type FormState = {
  id: string | null;
  title: string;
  description: string;
  content_image_url: string;
  category_id: string;
  sort_order: number;
};

const emptyForm = (): FormState => ({
  id: null,
  title: "",
  description: "",
  content_image_url: "",
  category_id: showcaseCategoryIds[0] ?? "saas-web-app",
  sort_order: 0,
});

export default function AdminDashboard() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const contentFileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects");
      const json = (await res.json()) as {
        projects?: AdminProject[];
        error?: string;
      };
      if (!res.ok) {
        setError(json.error ?? "Failed to load projects");
        return;
      }
      setProjects(json.projects ?? []);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function selectProject(p: AdminProject) {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      content_image_url: p.content_image_url ?? "",
      category_id: p.category_id,
      sort_order: p.sort_order,
    });
    setMessage(null);
  }

  function clearForm() {
    setForm(emptyForm());
    setMessage(null);
    if (contentFileRef.current) contentFileRef.current.value = "";
  }

  async function handleUploadContentImage(file: File) {
    setUploadingContent(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload-content-image", {
        method: "POST",
        body: fd,
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setMessage(json.error ?? "Upload failed");
        return;
      }
      if (json.url) {
        setForm((f) => ({ ...f, content_image_url: json.url! }));
        setMessage("Detail image uploaded — save to persist.");
      }
    } finally {
      setUploadingContent(false);
      if (contentFileRef.current) contentFileRef.current.value = "";
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        content_image_url: form.content_image_url.trim() || null,
        category_id: form.category_id,
        /** Card imagery uses the detail image + site fallback only — no separate thumbnail column. */
        image_url: null as string | null,
        sort_order: form.sort_order,
      };

      if (!payload.title) {
        setMessage("Title is required");
        setSaving(false);
        return;
      }

      if (form.id) {
        const res = await fetch(`/api/admin/projects/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          setMessage(json.error ?? "Save failed");
          setSaving(false);
          return;
        }
        setMessage("Saved.");
        await load();
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          setMessage(json.error ?? "Create failed");
          setSaving(false);
          return;
        }
        await load();
        setForm(emptyForm());
        if (contentFileRef.current) contentFileRef.current.value = "";
        setMessage("Created.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/projects/${form.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = await res.json();
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

  const categoryOptions = projectPortfolioCategories.filter((c) => c.id !== "all");

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 md:px-8">
      <header className="mb-10 flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Portfolio projects
          </h1>
          <p className="mt-1 text-sm text-muted">
            Internal admin — projects stored in Supabase.
          </p>
        </div>
        <a
          href="/"
          className="rounded-pill border border-black/15 bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white"
        >
          Back to site
        </a>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              All projects
            </h2>
            <button
              type="button"
              onClick={clearForm}
              className="text-xs font-medium text-accent hover:underline"
            >
              New project
            </button>
          </div>
          {loading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-muted">No projects yet. Create one on the right.</p>
          ) : (
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectProject(p)}
                    className={cn(
                      "w-full rounded-xl border px-3 py-2.5 text-left text-sm transition",
                      form.id === p.id
                        ? "border-accent/45 bg-accent/10 shadow-soft"
                        : "border-black/10 bg-white/60 hover:border-black/20"
                    )}
                  >
                    <span className="font-medium">{p.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {categoryOptions.find((c) => c.id === p.category_id)?.label ??
                        p.category_id}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <form onSubmit={handleSave} className="space-y-5 rounded-2xl border border-black/10 bg-white/65 p-5 shadow-soft backdrop-blur-md md:p-6">
            <h2 className="font-display text-lg font-semibold">
              {form.id ? "Edit project" : "New project"}
            </h2>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Title
              </span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Description
              </span>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={4}
                className="w-full resize-y rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Category
              </span>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category_id: e.target.value }))
                }
                className="w-full rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
              >
                {categoryOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="space-y-2 rounded-xl border border-black/10 bg-white/40 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Detail image (optional)
              </span>
              <p className="text-xs text-muted">
                Shown in the project dialog. Upload to Storage or paste a URL.
              </p>
              <input
                ref={contentFileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="block w-full text-sm text-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-accent/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
                disabled={uploadingContent || saving}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUploadContentImage(file);
                }}
              />
              <label className="mt-2 block space-y-1.5">
                <span className="sr-only">Detail image URL</span>
                <input
                  value={form.content_image_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, content_image_url: e.target.value }))
                  }
                  placeholder="https://… or use upload above"
                  className="w-full rounded-xl border border-black/12 bg-white/90 px-3 py-2 font-mono text-xs outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              {form.content_image_url ? (
                <div className="relative mt-2 aspect-video max-h-40 overflow-hidden rounded-lg border border-black/10 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.content_image_url}
                    alt="Detail preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                Sort order
              </span>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sort_order: Number.parseInt(e.target.value, 10) || 0,
                  }))
                }
                className="w-full max-w-[12rem] rounded-xl border border-black/12 bg-white/90 px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving || uploadingContent}
                className="rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95 disabled:opacity-50"
              >
                {saving ? "Saving…" : form.id ? "Save changes" : "Create project"}
              </button>
              {form.id ? (
                <button
                  type="button"
                  onClick={() => void handleDelete()}
                  disabled={saving || uploadingContent}
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
