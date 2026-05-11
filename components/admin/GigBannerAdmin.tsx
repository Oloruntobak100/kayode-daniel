"use client";

import Image from "next/image";
import { Download, Loader2, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import {
  FIVERR_GIG_BANNER_HEIGHT,
  FIVERR_GIG_BANNER_WIDTH,
} from "@/lib/gig-banner-prompt";
import { cn } from "@/lib/utils";

export default function GigBannerAdmin() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generate = useCallback(async () => {
    const t = title.trim();
    if (!t) {
      setError("Enter your gig title.");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/generate-gig-banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: t,
          keywords: keywords.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        url?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(json.error ?? "Generation failed");
        setImageUrl(null);
        return;
      }
      if (json.url) setImageUrl(json.url);
      else {
        setError("No image URL returned");
        setImageUrl(null);
      }
    } catch {
      setError("Network error");
      setImageUrl(null);
    } finally {
      setGenerating(false);
    }
  }, [title, keywords]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-soft backdrop-blur-md md:p-8">
        <div className="flex flex-col gap-2 border-b border-black/8 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Fiverr gig banner
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Generated at{" "}
              <span className="font-medium text-foreground">
                {FIVERR_GIG_BANNER_WIDTH}×{FIVERR_GIG_BANNER_HEIGHT}px
              </span>
              .{" "}
              <span className="font-medium text-foreground">Fal</span> draws a
              dark abstract background only; your{" "}
              <span className="font-medium text-foreground">title is typeset</span>{" "}
              exactly as entered, and keywords use{" "}
              <span className="font-medium text-foreground">Simple Icons</span>{" "}
              (real brand marks on the right).
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <div className="flex flex-col gap-5">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Gig title
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g. I will build your Next.js SaaS on Vercel & Cloudflare'
                className="w-full rounded-xl border border-black/12 bg-white/90 px-4 py-3 text-sm outline-none ring-accent/30 placeholder:text-muted/70 focus:border-accent/40 focus:ring-2"
                disabled={generating}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Tech keywords (optional)
              </span>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Next.js, Vercel, TypeScript, Stripe — comma separated"
                className="w-full rounded-xl border border-black/12 bg-white/90 px-4 py-3 text-sm outline-none ring-accent/30 placeholder:text-muted/70 focus:border-accent/40 focus:ring-2"
                disabled={generating}
              />
              <span className="mt-1.5 block text-xs text-muted">
                Comma-separated tech stack names (e.g. React, Next.js, Vercel).
                Icons load from Simple Icons — spell names clearly so they map
                to known brands.
              </span>
            </label>

            <button
              type="button"
              onClick={() => void generate()}
              disabled={generating || !title.trim()}
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
                generating || !title.trim()
                  ? "cursor-not-allowed bg-black/10 text-muted"
                  : "bg-accent text-accent-foreground hover:opacity-95"
              )}
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Sparkles className="h-4 w-4" aria-hidden />
              )}
              {generating ? "Generating…" : "Generate banner"}
            </button>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            ) : null}

            <p className="text-xs leading-relaxed text-muted">
              If an icon is missing, try another spelling (e.g. “Next.js” not
              “next js”). Requires{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-[11px]">
                FAL_KEY
              </code>{" "}
              and Supabase storage.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Preview
            </span>
            <div className="relative aspect-[1280/769] w-full overflow-hidden rounded-xl border border-black/10 bg-black/[0.03]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Generated gig banner preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              ) : (
                <div className="flex h-full min-h-[180px] items-center justify-center px-4 text-center text-sm text-muted">
                  Generated image appears here
                </div>
              )}
            </div>
            {imageUrl ? (
              <a
                href={imageUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-black/15 bg-white/90 px-4 py-2.5 text-sm font-medium hover:bg-white"
              >
                <Download className="h-4 w-4 text-accent" aria-hidden />
                Open / download file
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
