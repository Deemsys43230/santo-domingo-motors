import { useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navLinks } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        aria-label={t("navigation.closeMenu")}
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
      />
      <div
        id="mobile-menu"
        className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-3xl bg-background p-6 shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-burgundy">JMMB Bank</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("navigation.closeMenu")}
            className="inline-flex size-11 items-center justify-center rounded-full hairline text-charcoal"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t("navigation.primaryNav")} className="mt-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id} className="border-b border-border/70">
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-14 items-center justify-between font-display text-xl text-charcoal"
                >
                  {t(link.key)}
                  <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher variant="stacked" className="mt-8" />

        <div className="mt-8 flex flex-col gap-3 pb-4">
          <Button variant="primary" size="lg" fullWidth onClick={onClose}>
            {t("navigation.openAccount")}
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={onClose}>
            {t("navigation.login")}
          </Button>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{t("utility.exchangeRates")}</span>
            <span>{t("utility.locations")}</span>
            <span>{t("utility.contact")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
