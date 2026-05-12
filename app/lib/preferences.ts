import { Locale } from "../data/content";

export type ThemeId = "neo-mint" | "electric-blue" | "lapreviapp";

export const DEFAULT_THEME: ThemeId = "electric-blue";
export const DEFAULT_LOCALE: Locale = "es";

export const THEME_COOKIE_KEY = "jgarcia3199-theme";
export const LOCALE_COOKIE_KEY = "jgarcia3199-locale";

export const THEME_STORAGE_KEY = THEME_COOKIE_KEY;
export const LOCALE_STORAGE_KEY = LOCALE_COOKIE_KEY;

const THEME_SET = new Set<ThemeId>(["electric-blue"]);
const LOCALE_SET = new Set<Locale>(["es", "va"]);

export function parseTheme(value?: string | null): ThemeId {
  if (value && THEME_SET.has(value as ThemeId)) {
    return value as ThemeId;
  }

  return DEFAULT_THEME;
}

export function parseLocale(value?: string | null): Locale {
  if (value && LOCALE_SET.has(value as Locale)) {
    return value as Locale;
  }

  return DEFAULT_LOCALE;
}
