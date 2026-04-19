"use client";

import Image from "next/image";
import type { SectionId } from "@/lib/content";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  section: SectionId;
};

export default function SectionVisual({ section }: Props) {
  const usePortrait = section === "me" || section === "experience";
  const src = usePortrait ? profile.photoSrc : profile.avatarSrc;

  return (
    <div
      className={cn(
        "relative aspect-[4/5] min-h-[280px] w-full min-w-0 overflow-hidden rounded-[2rem] border border-black/10 shadow-glass",
        section === "experience" && "ring-2 ring-amber-400/15",
        section === "projects" && "ring-2 ring-accent/15",
        section === "skills" && "ring-2 ring-emerald-400/15",
        section === "blog" && "ring-2 ring-violet-400/15",
        section === "contact" && "ring-2 ring-sky-400/15"
      )}
    >
      <Image
        src={src}
        alt={
          usePortrait
            ? `Portrait of ${profile.name}`
            : `${profile.name}`
        }
        fill
        priority
        sizes="(max-width: 768px) 100vw, 40vw"
        quality={90}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-display text-lg font-semibold">{profile.name}</p>
        <p className="text-sm text-muted">{profile.location}</p>
      </div>
    </div>
  );
}
