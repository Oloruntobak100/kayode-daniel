"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  categoryLabel: string;
  imageSrc: string;
};

export default function ShowcaseProjectCard({
  title,
  categoryLabel,
  imageSrc,
}: Props) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-black/10 bg-white/65 shadow-soft backdrop-blur-md transition",
        "hover:border-accent/35 hover:shadow-glass"
      )}
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
      </div>
    </article>
  );
}
