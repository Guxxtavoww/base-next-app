'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { TranslationProvider } from '@/contexts/translations.context';

export const queryClient = new QueryClient();

export function Providers({
  children,
  ...props
}: WithChildren<ThemeProviderProps>): JSX.Element {
  return (
    <HydrationOverlay>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          <TranslationProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </TranslationProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </HydrationOverlay>
  );
}
