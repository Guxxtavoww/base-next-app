import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';

export const queryClient = new QueryClient();

export function Providers({
  children,
  ...props
}: WithChildren<ThemeProviderProps>): JSX.Element {
  return (
    <HydrationOverlay>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          <TooltipProvider>{children}</TooltipProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </HydrationOverlay>
  );
}
