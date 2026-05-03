"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SHOWCASE_CARD_FALLBACK_SRC } from "@/lib/showcase-card-image";
import { cn } from "@/lib/utils";
import {
  extractYouTubeVideoId,
  youTubeEmbedUrl,
} from "@/lib/youtube";

type Props = {
  title: string;
  categoryLabel: string;
  imageSrc: string;
  description?: string;
  contentImageUrl?: string | null;
  youtubeUrl?: string | null;
  projectUrl?: string | null;
};

export default function ShowcaseProjectCard({
  title,
  categoryLabel,
  imageSrc,
  description,
  contentImageUrl,
  youtubeUrl,
  projectUrl,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openLightbox = useCallback((src: string) => {
    setLightboxSrc(src);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeDialog();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [closeDialog]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxSrc, closeLightbox]);

  const trimmed = description?.trim() ?? "";
  const excerpt =
    trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;

  const trimmedContent = contentImageUrl?.trim() ?? "";
  const cardThumbSrc = imageSrc.trim() || SHOWCASE_CARD_FALLBACK_SRC;
  const trimmedThumb = cardThumbSrc.trim();
  const ytId = extractYouTubeVideoId(youtubeUrl?.trim() ?? "");
  const detailSrc =
    trimmedContent && trimmedContent !== trimmedThumb ? trimmedContent : null;

  const showImageInDialog = Boolean(detailSrc) && !ytId;
  const trimmedProject = projectUrl?.trim() ?? "";

  const hasDialogBody =
    Boolean(ytId) ||
    Boolean(showImageInDialog && detailSrc) ||
    Boolean(description?.trim()) ||
    Boolean(trimmedProject);

  return (
    <>
      <article
        className={cn(
          "group overflow-hidden rounded-2xl border border-black/10 bg-white/65 shadow-soft backdrop-blur-md transition",
          "hover:border-accent/35 hover:shadow-glass"
        )}
      >
        <button
          type="button"
          onClick={() => openLightbox(cardThumbSrc)}
          className="relative block w-full cursor-zoom-in touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={`View ${title} image full screen`}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <Image
              src={cardThumbSrc}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px"
              className="object-cover transition duration-300 md:group-hover:scale-[1.02]"
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2.5 text-left text-[11px] font-medium text-white/95 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
              aria-hidden
            >
              <span className="sm:hidden">Tap to expand</span>
              <span className="hidden sm:inline">Click to expand</span>
            </span>
          </div>
        </button>

        <div className="border-t border-black/[0.06]">
          <button
            type="button"
            onClick={openDialog}
            className="block min-h-[48px] w-full touch-manipulation p-4 text-left transition active:bg-black/[0.04] hover:bg-black/[0.03] md:p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Open details for ${title}`}
          >
            <h3 className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {title}
            </h3>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
              {categoryLabel}
            </p>
            {excerpt ? (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/80">
                {excerpt}
              </p>
            ) : null}
          </button>
          {trimmedProject ? (
            <a
              href={trimmedProject}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 border-t border-black/[0.04] px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/[0.06] md:px-5"
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              Visit project site
            </a>
          ) : null}
        </div>
      </article>

      <dialog
        ref={dialogRef}
        className="fixed left-[50%] top-[50%] z-[100] w-[min(100vw-1rem,42rem)] max-h-[min(90dvh,640px)] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border border-black/15 bg-background p-0 shadow-glass sm:w-[min(100vw-1.5rem,42rem)] sm:rounded-2xl [&::backdrop]:bg-black/50"
      >
        <div className="max-h-[min(90dvh,640px)] overflow-y-auto overscroll-contain">
          <div className="sticky top-0 z-[1] flex items-start gap-2 border-b border-black/10 bg-background/95 px-3 py-3 backdrop-blur-md sm:items-center sm:px-4">
            <h2 className="font-display min-w-0 flex-1 pr-2 text-base font-semibold leading-snug sm:text-lg">
              {title}
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              className="min-h-[44px] min-w-[44px] shrink-0 touch-manipulation rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium hover:bg-white sm:min-h-0 sm:min-w-0 sm:py-1.5"
            >
              Close
            </button>
          </div>
          <div className="space-y-4 p-3 sm:p-4">
            {trimmedProject ? (
              <a
                href={trimmedProject}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-accent/35 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent/15"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Open project site
              </a>
            ) : null}

            {ytId ? (
              <div className="overflow-hidden rounded-xl bg-black">
                <div className="relative aspect-video w-full">
                  <iframe
                    title={`${title} — video`}
                    src={youTubeEmbedUrl(ytId)}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}

            {showImageInDialog && detailSrc ? (
              <button
                type="button"
                onClick={() => openLightbox(detailSrc)}
                className="relative block w-full touch-manipulation overflow-hidden rounded-xl bg-neutral-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="View detail image full screen"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={detailSrc}
                  alt=""
                  className="max-h-[min(45dvh,360px)] w-full object-contain sm:max-h-[min(50vh,360px)]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent py-2.5 text-center text-[11px] text-white/95">
                  <span className="sm:hidden">Tap to expand</span>
                  <span className="hidden sm:inline">Click to expand</span>
                </span>
              </button>
            ) : null}
            {description?.trim() ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {description.trim()}
              </p>
            ) : null}
            {!hasDialogBody ? (
              <p className="text-sm text-muted">No additional details yet.</p>
            ) : null}
          </div>
        </div>
      </dialog>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[200] flex touch-none items-center justify-center bg-black/92 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen image"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[210] flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close full screen image"
          >
            <X className="h-6 w-6" strokeWidth={2} />
          </button>
          <div
            className="relative max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxSrc}
              alt=""
              className="max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] max-w-[calc(100vw-1.5rem)] object-contain shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
