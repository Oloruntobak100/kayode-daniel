"use client";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useMagnet } from "@/hooks/useMagnet";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MagneticWrap({ children, className }: Props) {
  const fine = useFinePointer();
  const ref = useMagnet<HTMLDivElement>(fine);

  return (
    <div ref={ref} className={cn(className)} data-cursor-hover>
      {children}
    </div>
  );
}
