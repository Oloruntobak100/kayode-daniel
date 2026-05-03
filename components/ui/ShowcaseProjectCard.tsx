"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SHOWCASE_CARD_FALLBACK_SRC } from "@/lib/showcase-card-image";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  categoryLabel: string;
  imageSrc: string;
  description?: string;
  contentImageUrl?: string | null;
};

export default function ShowcaseProjectCard({
  title,
  categoryLabel,
  imageSrc,
  description,
  contentImageUrl,
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
  const detailSrc =
    trimmedContent && trimmedContent !== trimmedThumb ? trimmedContent : null;

  const hasDialogBody =
    Boolean(detailSrc) || Boolean(description?.trim());

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
          className="relative block w-full cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={`View ${title} image full screen`}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <Image
              src={cardThumbSrc}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2 text-left text-[11px] font-medium text-white/95 opacity-0 transition group-hover:opacity-100"
              aria-hidden
            >
              Click to expand
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={openDialog}
          className="block w-full border-t border-black/[0.06] p-4 text-left transition hover:bg-black/[0.03] md:p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`Open details for ${title}`}
        >
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
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
      </article>

      <dialog
        ref={dialogRef}
        className="fixed left-[50%] top-[50%] z-[100] w-[min(100vw-1.5rem,42rem)] max-h-[min(90vh,640px)] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-2xl border border-black/15 bg-background p-0 shadow-glass [&::backdrop]:bg-black/50"
      >
        <div className="max-h-[min(90vh,640px)] overflow-y-auto">
          <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-black/10 bg-background/95 px-4 py-3 backdrop-blur-md">
            <h2 className="font-display pr-4 text-lg font-semibold leading-snug">
              {title}
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              className="shrink-0 rounded-lg border border-black/10 bg-white/80 px-3 py-1.5 text-sm font-medium hover:bg-white"
            >
              Close
            </button>
          </div>
          <div className="space-y-4 p-4">
            {detailSrc ? (
              <button
                type="button"
                onClick={() => openLightbox(detailSrc)}
                className="relative block w-full overflow-hidden rounded-xl bg-neutral-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="View detail image full screen"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={detailSrc}
                  alt=""
                  className="max-h-[min(50vh,360px)] w-full object-contain"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent py-2 text-center text-[11px] text-white/95">
                  Click to expand
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4"
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
            className="absolute right-4 top-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close full screen image"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <div
            className="relative max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxSrc}
              alt=""
              className="max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] object-contain shadow-2xl"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
