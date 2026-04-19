"use client";

import { ArrowRight, ArrowUp } from "lucide-react";
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (value: string) => void;
  variant?: "hero" | "dock";
  placeholder?: string;
};

export default function ChatInput({
  onSubmit,
  variant = "dock",
  placeholder = "Ask me anything...",
}: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSubmit(v);
    setValue("");
  };

  return (
    <div
      className={cn(
        "glass-panel flex w-full items-center gap-2 rounded-pill shadow-soft",
        variant === "hero" && "max-w-lg px-3 py-2",
        variant === "dock" && "gap-2 px-3 py-2 sm:gap-3 sm:px-4"
      )}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder={placeholder}
        className={cn(
          "placeholder:text-muted/80 flex-1 bg-transparent outline-none",
          variant === "hero" && "text-xs sm:text-sm",
          variant === "dock" && "text-sm"
        )}
        aria-label="Ask a question"
      />
      <MagneticButton
        data-cursor-hover
        onClick={submit}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-soft transition hover:brightness-105",
          variant === "hero" && "h-9 w-9",
          variant === "dock" && "h-10 w-10 sm:h-11 sm:w-11"
        )}
      >
        {variant === "hero" ? (
          <ArrowRight className="h-4 w-4" aria-hidden />
        ) : (
          <ArrowUp className="h-5 w-5" aria-hidden />
        )}
      </MagneticButton>
    </div>
  );
}
