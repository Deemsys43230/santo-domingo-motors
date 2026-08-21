import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
  as?: ElementType | undefined;
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}
