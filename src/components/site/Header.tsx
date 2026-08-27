import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTestDrive } from "./TestDriveContext";
import { brands } from "@/data/vehicles";

const brandLinks = [
  { label: "Cadillac", href: "#vehicles" },
  { label: "Chevrolet", href: "#vehicles" },
  { label: "Infiniti", href: "#vehicles" },
  { label: "Nissan", href: "#vehicles" },
  { label: "Suzuki", href: "#vehicles" },
  { label: "Yamaha", href: "#vehicles" },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { openModal } = useTestDrive();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menu;

  const mainLinks = [
    { href: "#used", label: t.nav.used },
    { href: "#services", label: t.nav.services },
    { href: "#financing", label: t.nav.financing },
    { href: "#locations", label: t.nav.locations },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-[#080808] border-b border-white/10" : "border-b border-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Santo Domingo Motors" className="h-10 w-10 object-contain border border-white/10" />
          <div className="flex flex-col font-display uppercase leading-[0.9] text-white">
            <span className="text-sm font-bold tracking-[0.05em]">Santo Domingo</span>
            <span className="text-[10px] tracking-[0.25em] text-[#FFC72C]">Motors</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 xl:flex ml-auto mr-8">
          {["Cadillac", "Chevrolet", "Infiniti", "Nissan", "Suzuki", "Yamaha"].map((b) => (
            <div key={b} className="relative group cursor-pointer">
              <a href="#vehicles" className="flex items-center gap-1 text-[15px] font-medium text-white transition-colors hover:text-white/70">
                {b}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </a>
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[14px] font-bold tracking-wider">
            {(["en", "es"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i === 1 && <span className="text-white/30 text-[12px] font-normal">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`uppercase transition-colors hover:text-[#FFC72C] ${lang === l ? "text-[#FFC72C]" : "text-white/50"
                    }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          <button
            aria-label={t.nav.menu}
            onClick={() => setMenu((m) => !m)}
            className="text-white xl:hidden"
          >
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#080808] xl:hidden"
          >
            <div className="flex flex-col px-5 py-4 sm:px-8">
              <p className="eyebrow mb-2 text-white/30">{t.nav.brands}</p>
              {brandLinks.map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  onClick={() => setMenu(false)}
                  className="border-b border-white/10 py-3 font-display text-xl uppercase tracking-wide text-white transition-colors hover:text-[#FFC72C]"
                >
                  {b.label}
                </a>
              ))}
              {mainLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  className="border-b border-white/10 py-3 font-display text-xl uppercase tracking-wide text-white transition-colors last:border-0 hover:text-[#FFC72C]"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenu(false);
                  openModal();
                }}
                className="eyebrow mt-5 bg-[#FFC72C] px-5 py-4 text-[#080808] font-semibold tracking-widest"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
