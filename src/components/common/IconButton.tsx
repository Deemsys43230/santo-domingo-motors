import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  tone?: "dark" | "light";
};

export function IconButton({
  label,
  children,
  className,
  tone = "dark",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full transition-colors duration-300",
        tone === "dark"
          ? "text-charcoal hover:bg-secondary"
          : "text-burgundy-foreground hover:bg-burgundy-foreground/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
