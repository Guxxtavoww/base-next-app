'use server';

import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

const headers = { 'accept-language': 'en-US,en;q=0.5' };
const languages = new Negotiator({ headers }).languages();
const locales = ['pt-br', 'en-US'] as const;
const defaultLocale: Locales = locales[0];

export type Locales = (typeof locales)[number];

export function getLocale(request: NextRequest) {
  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
}
