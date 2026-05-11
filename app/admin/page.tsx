"use client";

import { useState } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import BlogAdmin from "@/components/admin/BlogAdmin";
import GigBannerAdmin from "@/components/admin/GigBannerAdmin";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [tab, setTab] = useState<"portfolio" | "blog" | "gig-banner">(
    "portfolio"
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Site admin
            </h1>
            <p className="mt-1 text-sm text-muted">
              Portfolio projects and blog posts (Supabase).
            </p>
          </div>
          <a
            href="/"
            className="inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-pill border border-black/15 bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white"
          >
            Back to site
          </a>
        </div>
        <div className="mx-auto flex max-w-5xl gap-1 px-4 pb-0 md:px-8">
          <button
            type="button"
            onClick={() => setTab("portfolio")}
            className={cn(
              "rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
              tab === "portfolio"
                ? "bg-white/80 text-foreground shadow-soft"
                : "text-muted hover:text-foreground"
            )}
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => setTab("blog")}
            className={cn(
              "rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
              tab === "blog"
                ? "bg-white/80 text-foreground shadow-soft"
                : "text-muted hover:text-foreground"
            )}
          >
            Blog
          </button>
          <button
            type="button"
            onClick={() => setTab("gig-banner")}
            className={cn(
              "rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
              tab === "gig-banner"
                ? "bg-white/80 text-foreground shadow-soft"
                : "text-muted hover:text-foreground"
            )}
          >
            Gig banner
          </button>
        </div>
      </header>

      {tab === "portfolio" ? (
        <AdminDashboard embedded />
      ) : tab === "blog" ? (
        <BlogAdmin />
      ) : (
        <GigBannerAdmin />
      )}
    </div>
  );
}
