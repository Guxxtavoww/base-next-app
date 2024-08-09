import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import { cn } from '@/utils/cn.util';
import { Providers } from '@/providers';
import { Toaster } from '@/components/ui/toaster';

import '../styles/app.styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'An App',
  description: 'An App description',
  keywords: ['keyword1'],
  authors: [
    {
      name: 'Gustavo',
      url: 'https://gustavo-augusto-portfolio.vercel.app/',
    },
  ],
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({ children }: WithChildren) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background antialiased',
          inter.className
        )}
      >
        <HydrationOverlay>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </Providers>
        </HydrationOverlay>
      </body>
    </html>
  );
}
