"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { SectionId } from "@/lib/content";
import { profile } from "@/lib/content";

/** Intrinsic size of exported `public/avatar-hero.png` — update if asset changes */
const AVATAR_W = 185;
const AVATAR_H = 231;

type Props = {
  onOpenSection: (id: SectionId) => void;
  onChatSubmit: (value: string) => void;
};

export default function Hero({ onOpenSection, onChatSubmit }: Props) {
  return (
    <motion.section
      className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-28 pt-16 sm:pb-32 sm:pt-20"
      variants={staggerContainer}
      initial={false}
      animate="visible"
      exit="exit"
    >
      {/* Text first (toukoum-style), then avatar — resized asset ~185×231 */}
      <motion.p
        variants={staggerItem}
        className="mb-2 text-center text-base font-medium text-foreground sm:text-lg"
      >
        {profile.greeting}
      </motion.p>
      <motion.h1
        variants={staggerItem}
        className="font-display mx-auto max-w-3xl text-center text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {profile.headline}
      </motion.h1>

      <motion.div
        variants={staggerItem}
        className="mt-8 flex shrink-0 justify-center sm:mt-10"
      >
        <Image
          src={profile.avatarSrc}
          alt=""
          width={AVATAR_W}
          height={AVATAR_H}
          priority
          sizes={`${AVATAR_W}px`}
          className="h-auto max-h-[231px] w-auto max-w-[185px] select-none rounded-2xl shadow-glass"
        />
      </motion.div>

      <motion.div variants={staggerItem} className="mt-12 w-full max-w-xl px-2">
        <ChatInput variant="hero" onSubmit={onChatSubmit} />
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="mt-10 flex w-full justify-center px-2"
      >
        <NavPills active={null} onSelect={onOpenSection} />
      </motion.div>
    </motion.section>
  );
}
