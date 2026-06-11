export const locales = ["it"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "it";

export const localeLabels: Record<AppLocale, string> = {
  it: "Italiano",
};
