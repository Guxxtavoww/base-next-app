'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export function TanstackProvider(props: WithChildren): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
