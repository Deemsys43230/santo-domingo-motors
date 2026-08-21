import { ArrowUpRight } from "lucide-react";

type GoalCardProps = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  cta: string;
};

export function GoalCard({ title, subtitle, image, alt, cta }: GoalCardProps) {
  return (
    <a
      href="#personal"
      aria-label={`${title} — ${cta}`}
      className="group relative block overflow-hidden rounded-3xl bg-charcoal shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={image}
          alt={alt}
          width={900}
          height={1100}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-charcoal-foreground/70">{title}</p>
        <p className="mt-2 font-display text-2xl leading-tight text-charcoal-foreground">
          {subtitle}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-charcoal-foreground/85">
          {cta}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </a>
  );
}
