"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import SectionLayout from "@/components/SectionLayout";
import { useSectionState } from "@/hooks/useSectionState";
import type { ShowcaseProject } from "@/lib/showcase-project";
import type { PortfolioProjectsSource } from "@/lib/portfolio-projects";

type Props = {
  showcaseProjects: ShowcaseProject[];
  portfolioSource: PortfolioProjectsSource;
};

export default function HomeClient({
  showcaseProjects,
  portfolioSource,
}: Props) {
  const { phase, activeSection, openSection, goHero } = useSectionState();

  const handleChatSubmit = (value: string) => {
    void value;
    openSection("me");
  };

  return (
    <div className="relative isolate min-h-screen bg-background">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {phase === "hero" ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero onOpenSection={openSection} onChatSubmit={handleChatSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="section"
            initial={{ opacity: 0, y: "55%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "40%" }}
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 28,
              mass: 0.9,
            }}
          >
            <SectionLayout
              activeSection={activeSection}
              onSelectSection={openSection}
              onBackHome={goHero}
              showcaseProjects={showcaseProjects}
              portfolioSource={portfolioSource}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
