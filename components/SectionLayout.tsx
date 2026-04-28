"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import NavPills from "@/components/NavPills";
import SectionVisual from "@/components/SectionVisual";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Me from "@/components/sections/Me";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeSlideUp, sectionMarqueeSafe } from "@/lib/animations";
import type { SectionId } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onBackHome: () => void;
};

export default function SectionLayout({
  activeSection,
  onSelectSection,
  onBackHome,
}: Props) {
  /** Full-width content (no portrait column) */
  const hideAside =
    activeSection === "experience" ||
    activeSection === "projects" ||
    activeSection === "skills";

  const renderSection = () => {
    switch (activeSection) {
      case "me":
        return <Me />;
      case "experience":
        return <Experience />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "blog":
        return <Blog />;
      case "contact":
        return <Contact />;
      default:
        return <Me />;
    }
  };

  return (
    <div className="relative z-10 min-h-screen">
      <MagneticButton
        type="button"
        onClick={onBackHome}
        className="glass-pill fixed left-4 top-[5.25rem] z-[45] inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground shadow-soft md:left-12 md:top-[7rem]"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-4 w-4 text-accent" aria-hidden />
        Home
      </MagneticButton>

      <div
        className={cn(
          "mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-10 px-6 pb-36 pt-24 md:gap-14 md:px-12 md:pb-40 md:pt-32",
          hideAside
            ? "md:pt-28"
            : "md:grid-cols-[minmax(0,38%)_minmax(0,1fr)] md:pt-32"
        )}
      >
        {!hideAside && (
          <aside className="w-full min-w-0 md:sticky md:top-36 md:h-fit md:self-start">
            <SectionVisual section={activeSection} />
          </aside>
        )}

        <div
          className={cn(
            "min-w-0 w-full",
            hideAside &&
              activeSection === "experience" &&
              "mx-auto md:max-w-5xl"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={
                activeSection === "skills" ? sectionMarqueeSafe : fadeSlideUp
              }
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-none"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex min-h-[2.75rem] items-center justify-center pb-px">
            <NavPills
              active={activeSection}
              onSelect={onSelectSection}
              density="compact"
              layout="wrap"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
