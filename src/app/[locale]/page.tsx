import { Button } from '@/components/ui/button';
import { getTranslationServerSide } from '@/lib/i18n/functions/get-translation-server-side.lib';

import { ClientComponent } from './_components/client-component';

export default async function Home({
  params: { locale },
}: ServerComponentPageProps) {
  const translation = await getTranslationServerSide(locale);

  return (
    <main className="min-h-svh p-2 space-y-3">
      <h1>{translation('common_texts.greet')}</h1>
      <Button>{translation('common_texts.submit')}</Button>
      <ClientComponent />
    </main>
  );
}
