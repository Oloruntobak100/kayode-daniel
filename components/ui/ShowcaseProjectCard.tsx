"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { youtubeVideoIdFromUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  categoryLabel: string;
  imageSrc: string;
  description?: string;
  youtubeUrl?: string | null;
};

export default function ShowcaseProjectCard({
  title,
  categoryLabel,
  imageSrc,
  description,
  youtubeUrl,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const youtubeId = youtubeVideoIdFromUrl(youtubeUrl ?? undefined);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
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

  const trimmed = description?.trim() ?? "";
  const excerpt =
    trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;

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
          onClick={openDialog}
          className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`Open details for ${title}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <Image
              src={imageSrc}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="border-t border-black/[0.06] p-4 md:p-5">
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
          </div>
        </button>

        {youtubeUrl ? (
          <div className="border-t border-black/[0.06] px-4 pb-4 pt-2 md:px-5">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Watch on YouTube
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        ) : null}
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
            {youtubeId ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  title={`${title} video`}
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}
            {description?.trim() ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {description.trim()}
              </p>
            ) : (
              !youtubeId && (
                <p className="text-sm text-muted">No additional details yet.</p>
              )
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
