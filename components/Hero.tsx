"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NavPills from "@/components/NavPills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { SectionId } from "@/lib/content";
import { profile } from "@/lib/content";

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
      {/* Tall narrow PNG — fixed width band, generous height so full-body fits via object-contain */}
      <motion.div
        variants={staggerItem}
        className="relative mx-auto mb-6 h-[min(58vh,520px)] w-[min(72vw,220px)] max-w-[240px] overflow-hidden rounded-[2rem] shadow-glass sm:h-[min(68vh,560px)] sm:w-[240px]"
      >
        <Image
          src={profile.avatarSrc}
          alt=""
          fill
          priority
          sizes="(max-width:640px) 72vw, 240px"
          className="object-contain object-bottom bg-white"
        />
      </motion.div>

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
