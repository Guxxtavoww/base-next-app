import { type Locale, i18nConfig } from '@/config/i18n.config';

const translations = {
  'en-US': () => import('../translations/en-us.json'),
  'pt-br': () => import('../translations/pt-br.json'),
} satisfies Record<Locale, () => Promise<object>>;

// Define a generated type for translation object.
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

// Define a generated type for all nested keys found in Translation type.
// eslint-disable-next-line no-unused-vars
export type TranslationObejct = (key: ObjectKeys<Translation>) => string;

/**
 * Loads a translation .json file asynchronously based on a given locale.
 * @param locale Locale string
 * @returns Translation object with translation key-value pairs.
 */
export async function loadTranslation(locale: Locale): Promise<Translation> {
  return translations[locale]();
}
