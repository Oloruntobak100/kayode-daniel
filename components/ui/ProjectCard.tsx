"use client";

import { animated, useSpring, to } from "@react-spring/web";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { ExternalLink } from "lucide-react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: readonly string[];
  liveUrl: string;
  githubUrl: string;
};

type Props = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ rx, ry }, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    config: { mass: 1.2, tension: 350, friction: 26 },
  }));

  const transform = to(
    [rx, ry],
    (x, y) =>
      `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      api.start({
        rx: -py * 10,
        ry: px * 10,
      });
    },
    [api]
  );

  const reset = useCallback(() => {
    api.start({ rx: 0, ry: 0 });
  }, [api]);

  return (
    <animated.div
      ref={ref}
      data-cursor-hover
      className={cn(
        "glass-panel relative overflow-hidden rounded-3xl p-6 shadow-soft transition-shadow hover:shadow-glass",
        className
      )}
      style={{
        transform,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-full border-black/10"
              aria-label="Live demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-full border-black/10"
              aria-label="GitHub repository"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </animated.div>
  );
}
