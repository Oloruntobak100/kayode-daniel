"use client";

import { ReactLenis } from "lenis/react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<typeof ReactLenis>;

export default function SmoothScroll({
  className,
  children,
  ...props
}: Props) {
  return (
    <ReactLenis
      {...props}
      options={{
        smoothWheel: true,
        ...(props.options ?? {}),
      }}
      className={cn(
        "max-h-[calc(100vh-11rem)] overflow-y-auto overscroll-contain md:max-h-[calc(100vh-10rem)]",
        className
      )}
    >
      {children}
    </ReactLenis>
  );
}
