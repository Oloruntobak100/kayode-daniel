"use client";

import { type ButtonHTMLAttributes } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useMagnet } from "@/hooks/useMagnet";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function MagneticButton({ className, children, ...props }: Props) {
  const fine = useFinePointer();
  const magnetRef = useMagnet<HTMLButtonElement>(fine);

  return (
    <button
      ref={magnetRef}
      type="button"
      data-cursor-hover
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  );
}
