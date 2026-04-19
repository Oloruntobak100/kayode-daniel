"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons/BrandIcons";
import MagneticWrap from "@/components/MagneticWrap";
import MagneticButton from "@/components/ui/MagneticButton";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { socialLinks } from "@/lib/content";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
} as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const send = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1600);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid w-full max-w-none gap-12 pb-8 md:grid-cols-2 md:gap-16"
    >
      <motion.div variants={staggerItem} className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Contact
        </p>
        <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight">
          Let&apos;s build something.
        </h2>
        <p className="text-muted">
          Tell me about your product, timeline, and what success looks like — I&apos;ll reply with next steps.
        </p>

        <div className="flex gap-4 pt-4">
          {socialLinks.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <MagneticWrap key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glass-panel inline-flex h-12 w-12 items-center justify-center rounded-2xl border-black/10 text-foreground transition hover:border-accent/40"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </MagneticWrap>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-5">
        <div className="glass-panel rounded-3xl p-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-accent/40"
            autoComplete="name"
          />
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-accent/40"
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <MagneticButton
          data-cursor-hover
          onClick={send}
          disabled={loading}
          className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:brightness-105 disabled:opacity-70"
        >
          {loading ? (
            <motion.span
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </motion.span>
          ) : (
            "Send message"
          )}
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}
