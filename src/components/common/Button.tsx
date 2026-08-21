import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light" | "lightOutline";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-burgundy hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "hairline border-burgundy/25 text-burgundy hover:bg-burgundy hover:text-burgundy-foreground hover:-translate-y-0.5",
  ghost: "text-burgundy hover:bg-secondary",
  light:
    "bg-background text-burgundy shadow-soft hover:bg-sand hover:-translate-y-0.5",
  lightOutline:
    "border border-burgundy-foreground/35 text-burgundy-foreground hover:bg-burgundy-foreground/10 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
