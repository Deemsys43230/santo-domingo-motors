import { ArrowRight, Building2, Coins, Compass, type LucideIcon } from "lucide-react";
import businessImage from "@/assets/images/business.jpg";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { businessSolutions } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

const icons: Record<string, LucideIcon> = { Building2, Coins, Compass };

export function BusinessBanking() {
  const { t } = useLanguage();

  return (
    <section id="business" className="section-y bg-background">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] shadow-lift">
              <img
                src={businessImage}
                alt={t("business.imageAlt")}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] hover:scale-[1.03]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-primary">{t("business.eyebrow")}</p>
              <h2 className="display-2 mt-5 text-charcoal">
                <span className="block">{t("business.titleLine1")}</span>
                <span className="block">{t("business.titleLine2")}</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {t("business.description")}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <Button size="lg" className="mt-9">
                {t("business.cta")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {businessSolutions.map((card, index) => {
            const Icon = icons[card.icon] ?? Building2;
            return (
              <Reveal key={card.id} delay={index * 90} className="h-full">
                <article className="hairline group h-full rounded-3xl bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 font-display text-2xl text-charcoal">
                    {t(`${card.key}.title`)}
                  </h3>
                  <p className="mt-4 text-[0.975rem] leading-relaxed text-muted-foreground">
                    {t(`${card.key}.description`)}
                  </p>
                  <a
                    href="#cta"
                    aria-label={`${t("personal.learnMoreAbout")} ${t(`${card.key}.title`)}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {t("personal.learnMore")}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
