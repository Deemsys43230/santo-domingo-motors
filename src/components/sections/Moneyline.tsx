import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CreditCard,
  Layers,
  PiggyBank,
  Receipt,
  Smartphone,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { moneylineFeatures } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

const icons: Record<string, LucideIcon> = {
  Receipt,
  CalendarClock,
  ArrowLeftRight,
  CreditCard,
  Layers,
  Smartphone,
};

function PhoneMockup() {
  const { t } = useLanguage();

  return (
    <div
      className="float-slow relative mx-auto w-[17.5rem] rounded-[2.5rem] border-[10px] border-charcoal bg-background p-4 shadow-lift sm:w-[19rem]"
      role="img"
      aria-label={`${t("moneyline.eyebrow")} — ${t("moneyline.phone.demoNote")}`}
    >
      <div
        aria-hidden="true"
        className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-charcoal/20"
      />
      <div aria-hidden="true">
        <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground">
          <span>9:41</span>
          <Wifi className="size-3.5" />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{t("moneyline.phone.greeting")}</p>

        <div className="mt-3 rounded-2xl bg-burgundy p-5 text-burgundy-foreground">
          <p className="text-[0.7rem] uppercase tracking-widest text-burgundy-foreground/65">
            {t("moneyline.phone.balanceLabel")}
          </p>
          <p className="mt-2 font-display text-2xl">{t("moneyline.phone.balance")}</p>
          <p className="mt-1 text-xs text-burgundy-foreground/65">
            {t("moneyline.phone.account")}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: t("moneyline.phone.send"), Icon: ArrowUpRight },
            { label: t("moneyline.phone.pay"), Icon: Receipt },
            { label: t("moneyline.phone.save"), Icon: PiggyBank },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-secondary py-3 text-[0.7rem] font-medium text-charcoal"
            >
              <Icon className="size-4 text-primary" />
              {label}
            </div>
          ))}
        </div>

        <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {t("moneyline.phone.activity")}
        </p>
        <ul className="mt-2 space-y-2.5">
          {[
            { label: t("moneyline.phone.item1"), amount: "− RD$ 5,000" },
            { label: t("moneyline.phone.item2"), amount: "− RD$ 2,340" },
            { label: t("moneyline.phone.item3"), amount: "+ RD$ 62,000" },
          ].map((row) => (
            <li key={row.label} className="flex items-center justify-between text-xs">
              <span className="truncate pr-3 text-charcoal/80">{row.label}</span>
              <span className="shrink-0 font-semibold text-charcoal">{row.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Moneyline() {
  const { t } = useLanguage();

  return (
    <section id="moneyline" className="section-y bg-burgundy text-burgundy-foreground">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-burgundy-foreground/65">{t("moneyline.eyebrow")}</p>
            <h2 className="display-2 mt-5 text-burgundy-foreground">
              <span className="block">{t("moneyline.titleLine1")}</span>
              <span className="block">{t("moneyline.titleLine2")}</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-burgundy-foreground/75">
              {t("moneyline.description")}
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {moneylineFeatures.map((feature, index) => {
              const Icon = icons[feature.icon] ?? Smartphone;
              return (
                <Reveal as="li" key={feature.id} delay={index * 70}>
                  <span className="flex items-center gap-3 text-[0.975rem] text-burgundy-foreground/90">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-burgundy-foreground/10">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {t(feature.key)}
                  </span>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={180}>
            <Button variant="light" size="lg" className="mt-11">
              {t("moneyline.cta")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <PhoneMockup />
          <p className="mt-6 text-center text-xs text-burgundy-foreground/55">
            {t("moneyline.phone.demoNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
