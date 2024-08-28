'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useMemo } from 'react';

import type { Locale } from '@/config/i18n.config';
import { Skeleton } from '@/components/ui/skeleton';
import getTranslation from '@/lib/i18n/functions/get-translation.lib';
import type { Translation } from '@/lib/i18n/functions/load-translation.lib';

interface TranslationContextProps {
  // eslint-disable-next-line no-unused-vars
  translation: (key: ObjectKeys<Translation>) => string | JSX.Element;
  isLoading: boolean;
}

export const TranslationContext =
  createContext<Nullable<TranslationContextProps>>(null);

export function TranslationProvider({ children }: WithChildren) {
  const pathname = usePathname();
  const locale = useMemo(() => pathname.split('/')[1] as Locale, [pathname]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-translation', locale],
    queryFn: async () => getTranslation(locale),
  });

  const translation = useCallback(
    (key: ObjectKeys<Translation>) =>
      isLoading ? (
        <Skeleton className="h-3 w-full inline" />
      ) : (
        String(data?.(key))
      ),
    [data, isLoading]
  );

  return (
    <TranslationContext.Provider value={{ translation, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(): TranslationContextProps {
  const context = useContext(TranslationContext);

  if (!context) throw new Error('Invalid hook usage');

  return context;
}
