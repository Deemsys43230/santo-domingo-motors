import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { personalProducts } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

export function PersonalBanking() {
  const { t } = useLanguage();

  return (
    <section id="personal" className="section-y bg-background">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("personal.eyebrow")}
          titleLines={[t("personal.title")]}
          description={t("personal.description")}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personalProducts.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 80}
              className="h-full"
            >
              <ProductCard
                name={t(`${product.key}.name`)}
                description={t(`${product.key}.description`)}
                tag={t(`${product.key}.tag`)}
                icon={product.icon}
                cta={t("personal.learnMore")}
                ariaLabel={`${t("personal.learnMoreAbout")} ${t(`${product.key}.name`)}`}
                featured={product.featured}
                
              />
            </Reveal>
          ))}
        </div>


        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-secondary px-8 py-8 md:flex-row md:items-center">
            <p className="font-display text-2xl text-burgundy">{t("personal.footnote")}</p>
            <Button variant="primary" size="md">
              {t("personal.footnoteCta")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
