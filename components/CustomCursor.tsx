"use client";

/**
 * Decorative cursor trail only — the OS cursor stays visible so clicks align
 * with what you see. Everything uses pointer-events-none so targets receive
 * real pointer events without obstruction.
 */

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

const DOTS = 8;
/** Snappy enough to feel tied to motion; decorative only (native cursor aims). */
const MAIN_LERP = 0.42;

export default function CustomCursor() {
  const fine = useFinePointer();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const dotPos = useRef(Array.from({ length: DOTS }, () => ({ x: 0, y: 0 })));
  const hovering = useRef(false);
  const hasInit = useRef(false);

  useEffect(() => {
    if (!fine) return;

    const setTarget = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!hasInit.current) {
        hasInit.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        dotPos.current.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovering.current = !!el?.closest("[data-cursor-hover]");
    };

    /** Snap overlay to the real pointer on click so feedback matches the hit target. */
    const snapOnPress = () => {
      pos.current.x = target.current.x;
      pos.current.y = target.current.y;
      dotPos.current.forEach((p) => {
        p.x = target.current.x;
        p.y = target.current.y;
      });
    };

    window.addEventListener("pointermove", setTarget, { passive: true });
    window.addEventListener("pointerdown", snapOnPress, { passive: true });

    const update = () => {
      pos.current.x += (target.current.x - pos.current.x) * MAIN_LERP;
      pos.current.y += (target.current.y - pos.current.y) * MAIN_LERP;

      if (ringRef.current) {
        const scale = hovering.current ? 1.35 : 1;
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      let leaderX = pos.current.x;
      let leaderY = pos.current.y;

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const k = 0.22 + i * 0.035;
        dotPos.current[i].x += (leaderX - dotPos.current[i].x) * k;
        dotPos.current[i].y += (leaderY - dotPos.current[i].y) * k;
        const dx = dotPos.current[i].x;
        const dy = dotPos.current[i].y;
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
        leaderX = dx;
        leaderY = dy;
        dot.style.opacity = String(Math.max(0.08, 0.42 - i * 0.045));
      });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("pointermove", setTarget);
      window.removeEventListener("pointerdown", snapOnPress);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[50]",
          "h-8 w-8 rounded-full border border-accent/35 bg-accent/10 shadow-md backdrop-blur-[1px]",
          "will-change-transform"
        )}
        aria-hidden
      />
      {Array.from({ length: DOTS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="pointer-events-none fixed left-0 top-0 z-[49] h-1.5 w-1.5 rounded-full bg-accent/35 will-change-transform"
          style={{ opacity: 0.35 }}
          aria-hidden
        />
      ))}
    </>
  );
}
