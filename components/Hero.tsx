"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { SectionId } from "@/lib/content";
import { profile } from "@/lib/content";

/** Intrinsic size of hero avatar — update if asset changes */
const AVATAR_W = 96;
const AVATAR_H = 120;

type Props = {
  onOpenSection: (id: SectionId) => void;
  onChatSubmit: (value: string) => void;
};

export default function Hero({ onOpenSection, onChatSubmit }: Props) {
  return (
    <motion.section
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-1 px-3 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-[max(0.35rem,env(safe-area-inset-top))] sm:gap-1.5 sm:px-5"
      variants={staggerContainer}
      initial={false}
      animate="visible"
      exit="exit"
    >
      {/* Compact stack — headline stays small so greeting → title → avatar → chat → nav fit in 100dvh */}
      <motion.p
        variants={staggerItem}
        className="text-center text-[11px] font-medium leading-none text-foreground sm:text-xs"
      >
        {profile.greeting}
      </motion.p>
      <motion.h1
        variants={staggerItem}
        className="font-display mx-auto max-w-[min(100%,22rem)] px-2 text-center text-[11px] font-semibold leading-[1.25] tracking-tight text-foreground sm:max-w-xl sm:text-xs md:text-sm"
      >
        {profile.headline}
      </motion.h1>

      <motion.div variants={staggerItem} className="flex shrink-0 justify-center py-0.5">
        <Image
          src={profile.avatarSrc}
          alt=""
          width={AVATAR_W}
          height={AVATAR_H}
          priority
          sizes={`${AVATAR_W}px`}
          className="h-auto max-h-[92px] w-auto max-w-[92px] select-none drop-shadow-md sm:max-h-[104px] sm:max-w-[104px]"
        />
      </motion.div>

      <motion.div variants={staggerItem} className="w-full max-w-md px-1">
        <ChatInput variant="hero" onSubmit={onChatSubmit} />
      </motion.div>

      {/* Single row + horizontal swipe if needed — avoids extra wrap height */}
      <motion.div
        variants={staggerItem}
        className="w-full max-w-[min(100vw,36rem)] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible"
      >
        <div className="flex justify-center pb-0.5 sm:pb-0">
          <NavPills
            active={null}
            onSelect={onOpenSection}
            density="compact"
            layout="singleRow"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
