import type { Locale } from '@/config/i18n.config';

import {
  loadTranslation,
  type Translation,
  type TranslationObejct,
} from './load-translation.lib';
import { getTranslationByKey } from './get-translation-by-key.lib';

/**
 * Get translation object on server-side based on a given locale.
 * @param locale
 * @returns
 */
export async function getTranslation(
  locale: Locale
): Promise<TranslationObejct> {
  // Load translation content from a file based on locale.
  const translation = await loadTranslation(locale);

  // Return translation data.
  return (key: ObjectKeys<Translation>) =>
    getTranslationByKey(key, translation);
}
