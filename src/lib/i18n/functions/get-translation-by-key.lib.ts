import type { Translation } from './load-translation.lib';

export type TranslationKeyValue = {
  [key: string]: string | TranslationKeyValue;
};

/**
 * Get translation value string based on a given key and translation.
 * @param keys Translation keys in an array of strings.
 * @param translation Translation object with key-value pair(s).
 * @returns Translation value string or translation object with key-value pairs.
 */
export function getTranslationValue(
  keys: string[],
  translation: TranslationKeyValue | string
): TranslationKeyValue | string {
  if (typeof translation === 'string') return translation;

  // Translation doesn't exist or keys array is empty, return an empty string.
  if (!translation || keys.length === 0) return 'Invalid Translation';

  // Assing first key in keys array and remove it from keys array.
  const key: string = keys.shift() || '';

  if (!translation[key]) return 'Invalid Translation Value';

  // Recursively call itself with remaining keys.
  return getTranslationValue(keys, translation[key]);
}

/**
 * Get translation value based on a given key and translation.
 * @param key Translation key string.
 * @param translation Translation object with key-value pairs.
 * @returns Translation value in string.
 */
export function getTranslationByKey(
  key: ObjectKeys<Translation>,
  translation: TranslationKeyValue
): string {
  const keys = key.split('.');

  const translationValue = getTranslationValue(keys, translation);

  if (!translationValue || typeof translationValue !== 'string') return key;

  return translationValue;
}
