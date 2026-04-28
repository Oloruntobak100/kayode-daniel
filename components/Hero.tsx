"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { SectionId } from "@/lib/content";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Intrinsic size of hero avatar — update if asset changes */
const AVATAR_W = 112;
const AVATAR_H = 140;

/** Split role titles (e.g. "A | B | C" or "A · B · C") into stacked lines with color rhythm */
function HeadlineStack({ text }: { text: string }) {
  const lines = text
    .split(/\s*[|·•]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <span className="inline-block text-balance">
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className={cn(
            "block font-extrabold tracking-tight",
            i === 0 && "text-foreground",
            i === 1 && "text-[#E84855]",
            i === 2 && "text-[#7c2d2d]",
            i > 2 && "text-foreground"
          )}
        >
          {line}
        </span>
      ))}
    </span>
  );
}

type Props = {
  onOpenSection: (id: SectionId) => void;
  onChatSubmit: (value: string) => void;
};

export default function Hero({ onOpenSection, onChatSubmit }: Props) {
  return (
    <motion.section
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-4 sm:px-6"
      variants={staggerContainer}
      initial={false}
      animate="visible"
      exit="exit"
    >
      <motion.p
        variants={staggerItem}
        className="text-center text-sm font-medium leading-none text-muted sm:text-base"
      >
        {profile.greeting}
      </motion.p>

      <motion.h1
        variants={staggerItem}
        className="font-hero mx-auto w-full max-w-[min(100%,24rem)] px-2 text-center text-[clamp(1.6rem,5.4vw,2.9rem)] font-extrabold leading-[0.95] sm:max-w-2xl md:max-w-3xl"
      >
        <HeadlineStack text={profile.headline} />
      </motion.h1>

      <motion.div variants={staggerItem} className="flex shrink-0 justify-center py-1">
        <Image
          src={profile.avatarSrc}
          alt=""
          width={AVATAR_W}
          height={AVATAR_H}
          priority
          sizes={`${AVATAR_W}px`}
          className="h-auto max-h-[112px] w-auto max-w-[112px] select-none drop-shadow-md sm:max-h-[128px] sm:max-w-[128px]"
        />
      </motion.div>

      <motion.div variants={staggerItem} className="w-full max-w-lg px-1">
        <ChatInput variant="hero" onSubmit={onChatSubmit} />
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="w-full max-w-[min(100vw,42rem)]"
      >
        <div className="flex justify-center pb-0.5 pt-1 sm:pb-0">
          <NavPills
            active={null}
            onSelect={onOpenSection}
            density="compact"
            layout="wrap"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
