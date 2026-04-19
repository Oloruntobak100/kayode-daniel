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
              /* Icon + label always in a row with breathing room between them */
              "glass-pill inline-flex flex-row items-center justify-center font-medium text-foreground/90 transition",
              compact && singleRow
                ? "min-w-[4.75rem] shrink-0 gap-2 px-2.5 py-2 text-[10px] sm:min-w-[5.25rem] sm:gap-2.5 sm:px-3 sm:py-2 sm:text-xs"
                : compact
                  ? "min-w-[4.75rem] gap-2 px-3 py-2 text-[10px] sm:min-w-[5.25rem] sm:gap-2.5 sm:px-3 sm:py-2 sm:text-xs"
                  : "min-w-[6rem] gap-2.5 px-4 py-2 text-xs sm:gap-3 sm:text-sm",
              isActive && "border-accent/40 bg-white/90 ring-2 ring-accent/25"
            )}
          >
            <Icon
              className={cn(
                "shrink-0 text-accent",
                compact && singleRow && "h-3.5 w-3.5 sm:h-4 sm:w-4",
                compact && !singleRow && "h-3.5 w-3.5 sm:h-4 sm:w-4",
                !compact && "h-4 w-4 sm:h-[18px] sm:w-[18px]"
              )}
              aria-hidden
            />
            <span className="leading-tight">{label}</span>
          </MagneticButton>
        );
      })}
    </nav>
  );
}
