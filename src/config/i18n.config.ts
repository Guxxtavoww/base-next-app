export const locales = ['pt-br', 'en-US'] as const;

export const i18nConfig = {
  defaultLocale: locales[0],
  locales,
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
