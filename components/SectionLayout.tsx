"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import SectionVisual from "@/components/SectionVisual";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Me from "@/components/sections/Me";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeSlideUp } from "@/lib/animations";
import type { SectionId } from "@/lib/content";

type Props = {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onChatSubmit: (value: string) => void;
  onBackHome: () => void;
};

export default function SectionLayout({
  activeSection,
  onSelectSection,
  onChatSubmit,
  onBackHome,
}: Props) {
  const renderSection = () => {
    switch (activeSection) {
      case "me":
        return <Me />;
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

      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-10 px-6 pb-44 pt-24 md:grid-cols-[minmax(0,38%)_minmax(0,1fr)] md:gap-14 md:px-12 md:pb-48 md:pt-32">
        <aside className="w-full min-w-0 md:sticky md:top-36 md:h-fit md:self-start">
          <SectionVisual section={activeSection} />
        </aside>

        <div className="min-w-0 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={fadeSlideUp}
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
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6">
          <ChatInput onSubmit={onChatSubmit} variant="dock" />
          <NavPills active={activeSection} onSelect={onSelectSection} />
          <p className="text-center text-[11px] text-muted">
            Built with Next.js — swap copy in{" "}
            <code className="font-mono text-[10px]">lib/content.ts</code>
          </p>
        </div>
      </div>
    </div>
  );
}
