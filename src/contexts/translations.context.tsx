'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useMemo } from 'react';

import type { Locale } from '@/config/i18n.config';
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslation } from '@/lib/i18n/functions/get-translation.lib';
import type { Translation } from '@/lib/i18n/functions/load-translation.lib';

interface TranslationContextProps {
  // eslint-disable-next-line no-unused-vars
  translation: (key: ObjectKeys<Translation>) => string | JSX.Element;
  // eslint-disable-next-line no-unused-vars
  changeTranslation: (lang: Locale) => void;
  isLoading: boolean;
  currentLocale: Locale;
}

export const TranslationContext =
  createContext<Nullable<TranslationContextProps>>(null);

export function TranslationProvider({ children }: WithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useMemo(
    () => pathname.split('/')[1] as Locale,
    [pathname]
  );

  const { data: getTranslationFn, isLoading } = useQuery({
    queryKey: ['get-translation', currentLocale],
    queryFn: async () => getTranslation(currentLocale),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const translation = useCallback(
    (key: ObjectKeys<Translation>) =>
      isLoading ? (
        <Skeleton className="h-3 w-full max-w-8 inline" />
      ) : (
        String(getTranslationFn?.(key))
      ),
    [getTranslationFn, isLoading]
  );

  const changeTranslation = useCallback(
    (lang: Locale) => {
      if (currentLocale === lang) return;

      router.replace(pathname.replace(currentLocale, lang), { scroll: false });
    },
    [currentLocale, router]
  );

  return (
    <TranslationContext.Provider
      value={{
        translation,
        isLoading,
        changeTranslation,
        currentLocale,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(): TranslationContextProps {
  const context = useContext(TranslationContext);

  if (!context) throw new Error('Invalid hook usage');

  return context;
}
