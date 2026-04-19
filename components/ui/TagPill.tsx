import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TagPill({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-black/10 bg-black/[0.04] px-3 py-1 font-mono text-xs text-foreground/90",
        className
      )}
    >
      {children}
    </span>
  );
}
