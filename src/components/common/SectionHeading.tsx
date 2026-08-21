import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  titleLines: string[];
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  titleLines,
  description,
  align = "left",
  tone = "dark",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <p
            className={cn(
              "eyebrow mb-5",
              tone === "light" ? "text-burgundy-foreground/70" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "display-2 text-balance",
            tone === "light" ? "text-burgundy-foreground" : "text-charcoal",
          )}
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i < titleLines.length - 1 ? "" : null}
            </span>
          ))}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-6 max-w-xl text-lg leading-relaxed",
              align === "center" && "mx-auto",
              tone === "light" ? "text-burgundy-foreground/75" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
      </Reveal>
      {action ? <Reveal delay={120}>{action}</Reveal> : null}
    </div>
  );
}
