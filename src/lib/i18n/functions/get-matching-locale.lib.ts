import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

import { type Locale, i18nConfig } from '@/config/i18n.config';

/**
 * Get best matching locale based on available client and app/server locales.
 * @param request
 * @returns
 */
export function getMatchingLocale(request: NextRequest): Locale {
  let userHeaders: Record<string, string> = {};

  request.headers.forEach(
    (headerValue, headerKey) => (userHeaders[headerKey] = headerValue)
  );

  const clientLocales = new Negotiator({ headers: userHeaders }).languages();

  let appLocales: Locale[] = [];

  for (const locale of i18nConfig.locales) {
    appLocales.push(locale);
  }

  const localeMatch: Locale = match(
    clientLocales,
    appLocales,
    i18nConfig.defaultLocale
  ) as Locale;

  return localeMatch;
}
