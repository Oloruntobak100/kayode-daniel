"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

const MAX_PX = 6;

export function useMagnet<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T | null>(null);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: "elastic.out(1, 0.35)",
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / rect.width) * MAX_PX * 2;
      const dy = ((e.clientY - cy) / rect.height) * MAX_PX * 2;
      const nx = Math.max(-MAX_PX, Math.min(MAX_PX, dx));
      const ny = Math.max(-MAX_PX, Math.min(MAX_PX, dy));
      gsap.to(el, {
        x: nx,
        y: ny,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [enabled, reset]);

  return ref;
}
