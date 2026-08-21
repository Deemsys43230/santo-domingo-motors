import trustImage from "@/assets/images/trust.jpg";
import { Reveal } from "@/components/common/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <img
        src={trustImage}
        alt={t("trust.imageAlt")}
        width={1920}
        height={912}
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/25"
      />
      <div className="container-page py-28 md:py-40">
        <Reveal className="max-w-3xl">
          <blockquote className="font-display text-3xl leading-[1.15] text-charcoal-foreground sm:text-4xl md:text-5xl">
            <span className="block">{t("trust.quoteLine1")}</span>
            <span className="block text-charcoal-foreground/80">{t("trust.quoteLine2")}</span>
          </blockquote>
          <p className="eyebrow mt-8 text-charcoal-foreground/60">{t("trust.attribution")}</p>
        </Reveal>
      </div>
    </section>
  );
}
