import { Facebook, Instagram, Linkedin } from "lucide-react";
import { footerGroups } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-charcoal text-charcoal-foreground">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-xl bg-primary font-display text-sm font-semibold text-primary-foreground"
              >
                J
              </span>
              <span className="font-display text-xl">JMMB Bank</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-charcoal-foreground/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-7 flex items-center gap-2" aria-label={t("footer.social")}>
              {[
                { Icon: Facebook, name: "Facebook" },
                { Icon: Instagram, name: "Instagram" },
                { Icon: Linkedin, name: "LinkedIn" },
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="#footer"
                  aria-label={name}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal-foreground/20 text-charcoal-foreground/80 transition-colors duration-300 hover:bg-charcoal-foreground/10 hover:text-charcoal-foreground"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.id} aria-label={t(group.titleKey)}>
                <h2 className="eyebrow text-charcoal-foreground/55">{t(group.titleKey)}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-charcoal-foreground/80 transition-colors duration-300 hover:text-charcoal-foreground"
                      >
                        {t(link)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-charcoal-foreground/12 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-charcoal-foreground/70">
            {[
              "footer.legal.privacy",
              "footer.legal.terms",
              "footer.legal.accessibility",
              "footer.legal.security",
            ].map((key) => (
              <a
                key={key}
                href="#footer"
                className="transition-colors duration-300 hover:text-charcoal-foreground"
              >
                {t(key)}
              </a>
            ))}
          </div>
          <LanguageSwitcher tone="light" />
        </div>

        <div className="mt-8 space-y-2 text-xs text-charcoal-foreground/50">
          <p>{t("footer.legal.copyright")}</p>
          <p>{t("footer.conceptNote")}</p>
        </div>
      </div>
    </footer>
  );
}
