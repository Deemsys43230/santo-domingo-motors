import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { insights } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

export function FinancialInsights() {
  const { t } = useLanguage();

  return (
    <section id="insights" className="section-y bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("insights.eyebrow")}
          titleLines={[t("insights.titleLine1"), t("insights.titleLine2")]}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {insights.map((article, index) => (
            <Reveal key={article.id} delay={index * 100}>
              <article className="group h-full">
                <a
                  href="#cta"
                  aria-label={`${t("insights.readArticle")}: ${t(`${article.key}.title`)}`}
                  className="flex h-full flex-col"
                >
                  <div className="overflow-hidden rounded-3xl shadow-soft">
                    <img
                      src={article.image}
                      alt={t(`${article.key}.alt`)}
                      width={1000}
                      height={750}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6 text-xs font-semibold uppercase tracking-widest text-primary">
                    <span>{t(`${article.key}.category`)}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-border" />
                    <span className="text-muted-foreground normal-case tracking-normal">
                      {t(`${article.key}.readTime`)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-charcoal">
                    {t(`${article.key}.title`)}
                  </h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                    {t(`${article.key}.description`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burgundy">
                    {t("insights.readMore")}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
