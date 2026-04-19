"use client";

import {
  BookOpen,
  Briefcase,
  History,
  Layers,
  Mail,
  UserRound,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import type { SectionId } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV: { id: SectionId; label: string; Icon: typeof UserRound }[] = [
  { id: "me", label: "Me", Icon: UserRound },
  { id: "experience", label: "Experience", Icon: History },
  { id: "projects", label: "Projects", Icon: Briefcase },
  { id: "skills", label: "Skills", Icon: Layers },
  { id: "blog", label: "Blog", Icon: BookOpen },
  { id: "contact", label: "Contact", Icon: Mail },
];

type Props = {
  active?: SectionId | null;
  onSelect: (id: SectionId) => void;
};

export default function NavPills({ active, onSelect }: Props) {
  return (
    <nav
      aria-label="Sections"
      className="flex w-full max-w-3xl flex-wrap justify-center gap-2 sm:gap-3"
    >
      {NAV.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <MagneticButton
            key={id}
            data-cursor-hover
            onClick={() => onSelect(id)}
            className={cn(
              "glass-pill inline-flex min-w-[5.5rem] flex-col items-center gap-1 px-4 py-2 text-xs font-medium text-foreground/90 transition sm:flex-row sm:gap-2 sm:text-sm",
              isActive && "border-accent/40 bg-white/90 ring-2 ring-accent/25"
            )}
          >
            <Icon className="h-4 w-4 text-accent" aria-hidden />
            <span>{label}</span>
          </MagneticButton>
        );
      })}
    </nav>
  );
}
