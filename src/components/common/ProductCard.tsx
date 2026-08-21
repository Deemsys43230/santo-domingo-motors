import {
  ArrowRight,
  CreditCard,
  HandCoins,
  LineChart,
  PiggyBank,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  PiggyBank,
  Wallet,
  LineChart,
  HandCoins,
  CreditCard,
};

type ProductCardProps = {
  name: string;
  description: string;
  tag: string;
  icon: string;
  cta: string;
  ariaLabel: string;
  featured?: boolean | undefined;
  className?: string | undefined;
};

export function ProductCard({
  name,
  description,
  tag,
  icon,
  cta,
  ariaLabel,
  featured,
  className,
}: ProductCardProps) {
  const Icon = icons[icon] ?? Wallet;

  return (
    <article
      className={cn(
        "group flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
        featured
          ? "bg-burgundy text-burgundy-foreground shadow-soft"
          : "hairline bg-card text-card-foreground shadow-soft",
        className,
      )}
    >
      <div>
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl transition-colors duration-500",
            featured ? "bg-burgundy-foreground/12 text-burgundy-foreground" : "bg-secondary text-primary",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <p
          className={cn(
            "eyebrow mt-7",
            featured ? "text-burgundy-foreground/65" : "text-muted-foreground",
          )}
        >
          {tag}
        </p>
        <h3
          className={cn(
            "mt-3 font-display text-2xl leading-tight",
            featured ? "text-burgundy-foreground" : "text-charcoal",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-4 text-[0.975rem] leading-relaxed",
            featured ? "text-burgundy-foreground/78" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      </div>
      <a
        href="#cta"
        aria-label={ariaLabel}
        className={cn(
          "mt-8 inline-flex items-center gap-2 text-sm font-semibold",
          featured ? "text-burgundy-foreground" : "text-primary",
        )}
      >
        {cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </a>
    </article>
  );
}
