import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

import { TooltipProvider } from '@/components/ui/tooltip';

import { TanstackProvider } from './tanstack-provider';

export function Providers({
  children,
  ...props
}: WithChildren<ThemeProviderProps>) {
  return (
    <TanstackProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </TanstackProvider>
  );
}
