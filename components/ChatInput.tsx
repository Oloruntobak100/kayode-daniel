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
        "glass-panel flex w-full items-center gap-3 rounded-pill px-4 py-3 shadow-soft",
        variant === "hero" && "max-w-xl"
      )}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder={placeholder}
        className="placeholder:text-muted/80 flex-1 bg-transparent text-sm outline-none"
        aria-label="Ask a question"
      />
      <MagneticButton
        data-cursor-hover
        onClick={submit}
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-soft transition hover:brightness-105",
          variant === "hero" && "h-10 w-10"
        )}
      >
        {variant === "hero" ? (
          <ArrowRight className="h-5 w-5" />
        ) : (
          <ArrowUp className="h-5 w-5" />
        )}
      </MagneticButton>
    </div>
  );
}
