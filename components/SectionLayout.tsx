"use client";

import { AnimatePresence, motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import SectionVisual from "@/components/SectionVisual";
import SmoothScroll from "@/components/SmoothScroll";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Me from "@/components/sections/Me";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { fadeSlideUp } from "@/lib/animations";
import type { SectionId } from "@/lib/content";

type Props = {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onChatSubmit: (value: string) => void;
};

export default function SectionLayout({
  activeSection,
  onSelectSection,
  onChatSubmit,
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
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-44 pt-20 md:grid-cols-[minmax(0,40%)_minmax(0,60%)] md:gap-12 md:px-12 md:pb-48 md:pt-28">
        <aside className="w-full min-w-0 md:sticky md:top-28 md:h-fit md:self-start">
          <SectionVisual section={activeSection} />
        </aside>

        <div className="flex min-h-0 flex-col md:h-[calc(100vh-10rem)]">
          <SmoothScroll className="h-full min-h-[50vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </SmoothScroll>
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
