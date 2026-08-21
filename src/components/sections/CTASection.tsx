import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="section-y bg-background">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-burgundy px-8 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/40 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display-2 text-balance text-burgundy-foreground">{t("cta.title")}</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-burgundy-foreground/75">
                {t("cta.description")}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button variant="light" size="lg" fullWidth className="sm:w-auto">
                  {t("cta.primaryButton")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="lightOutline" size="lg" fullWidth className="sm:w-auto">
                  {t("cta.secondaryButton")}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
