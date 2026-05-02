"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
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

  const trimmedContent = contentImageUrl?.trim() ?? "";
  const trimmedThumb = imageSrc.trim();
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
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary URLs from Supabase or uploads */}
                <img
                  src={detailSrc}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
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
    </>
  );
}
