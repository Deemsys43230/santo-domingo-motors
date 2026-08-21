import { en, type Translation } from "@/locales/en";
import { es } from "@/locales/es";

export type Language = "es" | "en";

export const LANGUAGES: Language[] = ["es", "en"];
export const DEFAULT_LANGUAGE: Language = "es";
export const LANGUAGE_STORAGE_KEY = "jmmb-language";

export const translations: Record<Language, Translation> = { en, es };

/** Resolve a dot-path such as "hero.title" against a translation object. */
export function resolvePath(dict: unknown, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      dict,
    );

  return typeof value === "string" ? value : path;
}

export function isLanguage(value: unknown): value is Language {
  return value === "es" || value === "en";
}
