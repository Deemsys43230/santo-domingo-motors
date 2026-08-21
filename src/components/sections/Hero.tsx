import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import heroImage from "@/assets/images/hero.jpg";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-accent/60 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-14 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pb-32">
        <div>
          <Reveal>
            <p className="eyebrow text-primary">{t("hero.eyebrow")}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-1 mt-6 text-charcoal">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block text-primary">{t("hero.titleLine2")}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("hero.description")}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="sm:w-auto" fullWidth>
                {t("hero.primaryButton")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="sm:w-auto" fullWidth>
                {t("hero.secondaryButton")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-14 grid max-w-md grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <dt className="text-sm text-muted-foreground">{t("hero.statClients")}</dt>
                <dd className="mt-1 font-display text-3xl text-burgundy">180K+</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">{t("hero.statYears")}</dt>
                <dd className="mt-1 font-display text-3xl text-burgundy">30+</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift">
            <img
              src={heroImage}
              alt={t("hero.imageAlt")}
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-burgundy/25 via-transparent to-transparent"
            />
          </div>

          <div className="absolute -bottom-6 left-2 w-[17rem] rounded-3xl bg-card p-5 shadow-lift sm:-left-8 md:-bottom-10">
            <div className="flex items-center gap-3">
              <p className="font-display text-lg leading-tight text-charcoal">
                {t("hero.cardTitle")}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("hero.cardText")}
            </p>
          </div>

          <div className="absolute -right-2 top-8 hidden items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-soft md:inline-flex">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-charcoal">JMMB Group</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
