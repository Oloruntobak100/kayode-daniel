"use client";

import { useCallback, useState } from "react";
import type { SectionId } from "@/lib/content";

export type Phase = "hero" | "section";

export function useSectionState() {
  const [phase, setPhase] = useState<Phase>("hero");
  const [activeSection, setActiveSection] = useState<SectionId>("me");

  const openSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    setPhase("section");
  }, []);

  const goHero = useCallback(() => {
    setPhase("hero");
  }, []);

  return {
    phase,
    activeSection,
    openSection,
    goHero,
  };
}
