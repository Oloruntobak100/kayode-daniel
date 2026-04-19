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
  /** Tighter pills for hero (single-viewport layout) */
  density?: "default" | "compact";
  /** Keep one horizontal row (pair with horizontal scroll on narrow heroes) */
  layout?: "wrap" | "singleRow";
};

export default function NavPills({
  active,
  onSelect,
  density = "default",
  layout = "wrap",
}: Props) {
  const compact = density === "compact";
  const singleRow = layout === "singleRow";
  return (
    <nav
      aria-label="Sections"
      className={cn(
        "flex justify-center",
        singleRow ? "w-max max-w-none flex-nowrap gap-1" : "w-full flex-wrap",
        !singleRow && compact && "max-w-4xl gap-1 sm:gap-1.5",
        !singleRow && !compact && "max-w-3xl gap-2 sm:gap-3"
      )}
    >
      {NAV.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <MagneticButton
            key={id}
            data-cursor-hover
            onClick={() => onSelect(id)}
            className={cn(
              "glass-pill inline-flex flex-col items-center font-medium text-foreground/90 transition sm:flex-row",
              compact && singleRow
                ? "min-w-[3.5rem] shrink-0 gap-0 px-1.5 py-1 text-[9px] sm:min-w-[4rem] sm:px-2 sm:py-1.5 sm:text-[10px]"
                : compact
                  ? "min-w-[4.25rem] gap-0.5 px-2 py-1.5 text-[10px] sm:min-w-[4.75rem] sm:gap-1 sm:px-2.5 sm:py-1.5 sm:text-xs"
                  : "min-w-[5.5rem] gap-1 px-4 py-2 text-xs sm:flex-row sm:gap-2 sm:text-sm",
              isActive && "border-accent/40 bg-white/90 ring-2 ring-accent/25"
            )}
          >
            <Icon
              className={cn(
                "text-accent",
                compact && singleRow && "h-2.5 w-2.5 sm:h-3 sm:w-3",
                compact && !singleRow && "h-3 w-3 sm:h-3.5 sm:w-3.5",
                !compact && "h-4 w-4"
              )}
              aria-hidden
            />
            <span>{label}</span>
          </MagneticButton>
        );
      })}
    </nav>
  );
}
