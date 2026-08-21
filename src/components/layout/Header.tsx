import { useEffect, useState } from "react";
import { Menu, Phone, Search, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/common/Button";
import { IconButton } from "@/components/common/IconButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "hidden bg-burgundy text-burgundy-foreground transition-all duration-500 lg:block",
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-14 opacity-100",
        )}
      >
        <div className="container-page flex h-11 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <TrendingUp className="size-3.5" aria-hidden="true" />
              {t("utility.exchangeRates")}
              <span className="text-burgundy-foreground/70">
                {t("utility.rateLabel")} · {t("utility.buy")} 59.10 · {t("utility.sell")} 61.45
              </span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#footer" className="inline-flex items-center gap-2 hover:underline">
              <MapPin className="size-3.5" aria-hidden="true" />
              {t("utility.locations")}
            </a>
            <a href="#cta" className="inline-flex items-center gap-2 hover:underline">
              <Phone className="size-3.5" aria-hidden="true" />
              {t("utility.contact")}
            </a>
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border/60 bg-background/85 backdrop-blur-xl transition-all duration-500",
          scrolled ? "shadow-soft" : "",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <a
            href="#top"
            aria-label={t("navigation.home")}
            className="flex items-center"
          >
            <svg
              width="270"
              height="44"
              viewBox="0 0 270 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 sm:h-10 w-auto shrink-0"
            >
              <path d="M10 34 L18 14 L32 14 L24 34 Z" fill="#c41230" />
              <path d="M34 34 L48 2 L62 2 L48 34 Z" fill="#c41230" />
              <text x="70" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="28" fill="#c41230">JMMB</text>
              <text x="156" y="30" fontFamily="sans-serif" fontSize="26" fill="#666666">Bank S.A.</text>
            </svg>
          </a>

          <nav
            aria-label={t("navigation.primaryNav")}
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="relative whitespace-nowrap text-sm font-medium text-charcoal/85 transition-colors duration-300 hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <IconButton label={t("navigation.searchLabel")} className="hidden sm:inline-flex">
              <Search className="size-4.5" aria-hidden="true" />
            </IconButton>
            <div className="hidden md:block lg:hidden">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
              {t("navigation.login")}
            </Button>
            <Button variant="primary" size="sm" className="hidden md:inline-flex">
              {t("navigation.openAccount")}
            </Button>
            <IconButton
              label={t("navigation.openMenu")}
              className="lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
