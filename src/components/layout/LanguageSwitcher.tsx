import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES, type Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";

type Props = {
  tone?: "dark" | "light";
  variant?: "compact" | "stacked";
  className?: string;
};

export function LanguageSwitcher({ tone = "dark", variant = "compact", className }: Props) {
  const { language, setLanguage, t } = useLanguage();

  const labelFor = (lng: Language) =>
    variant === "stacked"
      ? lng === "es"
        ? t("language.spanish")
        : t("language.english")
      : lng === "es"
        ? t("language.es")
        : t("language.en");

  if (variant === "stacked") {
    return (
      <div className={className}>
        <p className="eyebrow mb-3 text-muted-foreground">{t("language.label")}</p>
        <div
          role="group"
          aria-label={t("language.switcherLabel")}
          className="grid grid-cols-2 gap-2"
        >
          {LANGUAGES.map((lng) => (
            <button
              key={lng}
              type="button"
              lang={lng}
              onClick={() => setLanguage(lng)}
              aria-pressed={language === lng}
              className={cn(
                "min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-300",
                language === lng
                  ? "bg-burgundy text-burgundy-foreground"
                  : "hairline text-charcoal hover:bg-secondary",
              )}
            >
              {labelFor(lng)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("language.switcherLabel")}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-1",
        tone === "light" ? "bg-burgundy-foreground/10" : "bg-secondary",
        className,
      )}
    >
      <Globe
        aria-hidden="true"
        className={cn(
          "ml-1.5 size-3.5",
          tone === "light" ? "text-burgundy-foreground/70" : "text-muted-foreground",
        )}
      />
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          onClick={() => setLanguage(lng)}
          aria-pressed={language === lng}
          title={lng === "es" ? t("language.spanish") : t("language.english")}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors duration-300",
            language === lng
              ? tone === "light"
                ? "bg-burgundy-foreground text-burgundy"
                : "bg-burgundy text-burgundy-foreground"
              : tone === "light"
                ? "text-burgundy-foreground/70 hover:text-burgundy-foreground"
                : "text-muted-foreground hover:text-charcoal",
          )}
        >
          <span aria-hidden="true">{labelFor(lng)}</span>
          <span className="sr-only">
            {lng === "es" ? t("language.spanish") : t("language.english")}
            {language === lng ? ` — ${t("language.current")}` : ""}
          </span>
        </button>
      ))}
    </div>
  );
}
