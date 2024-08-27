import { NextRequest, NextResponse } from 'next/server';

import { type Locale, i18nConfig } from './config/i18n.config';
import { getMatchingLocale } from './lib/i18n/functions/get-matching-locale.lib';

export default function middleware(request: NextRequest) {
  // Loop through available locales in i18n config, set to true when
  // iterated locale is not found in current request url.
  const localeNotFound = i18nConfig.locales.every(
    (locale) =>
      !request.nextUrl.pathname.startsWith(`/${locale}/`) &&
      request.nextUrl.pathname !== `/${locale}`
  );

  // Locale not found in request url, redirect to matched locale url.
  if (localeNotFound) {
    const newLocale: Locale = getMatchingLocale(request);

    // Return new url redirect and redirect user to correct locale url.
    return NextResponse.redirect(
      new URL(`/${newLocale}/${request.nextUrl.pathname}`, request.url)
    );
  }
}

// TODO: For apps that require auth, this will have to be refactored
export const config = {
  // Matcher ignoring /_next/ and /api/
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
