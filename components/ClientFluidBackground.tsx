"use client";

import { useEffect, useState } from "react";
import FluidBackground from "@/components/FluidBackground";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

function StaticHeroBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-background"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 20%, rgba(199, 210, 254, 0.45) 0%, transparent 50%), radial-gradient(100% 60% at 80% 30%, rgba(255, 180, 160, 0.35) 0%, transparent 45%), radial-gradient(80% 50% at 50% 80%, rgba(167, 243, 208, 0.3) 0%, transparent 50%), #FAFAF8",
      }}
      aria-hidden
    />
  );
}

/**
 * Avoids SSR/client mismatch from `dynamic(..., { ssr: false })`.
 * First paint matches SSR (CSS backdrop); WebGL mounts after hydration.
 */
export default function ClientFluidBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StaticHeroBackdrop />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticHeroBackdrop />}>
      <FluidBackground />
    </WebGLErrorBoundary>
  );
}
