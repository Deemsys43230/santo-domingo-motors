import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  resolvePath,
  translations,
  type Language,
} from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Restore persisted language after hydration.
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) setLanguageState(stored);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — language still applies for this session */
    }
  }, []);

  // Keep document language + metadata in sync.
  useEffect(() => {
    const dict = translations[language];
    document.documentElement.lang = language;
    document.title = dict.meta.title;
    setMeta('meta[name="description"]', "name", "description", dict.meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", dict.meta.ogTitle);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      dict.meta.ogDescription,
    );
    setMeta('meta[property="og:locale"]', "property", "og:locale", language === "es" ? "es_DO" : "en_US");
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key: string) => resolvePath(translations[language], key),
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
