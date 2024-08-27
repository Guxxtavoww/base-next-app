import { Button } from '@/components/ui/button';
import getTranslation from '@/lib/i18n/functions/get-translation.lib';

export default async function Home({
  params: { locale },
}: ServerComponentPageProps) {
  const translation = await getTranslation(locale);

  return (
    <main className="min-h-svh p-2 space-y-4">
      <h1>{translation('common_texts.greet')}</h1>
      <Button>{translation('common_texts.submit')}</Button>
    </main>
  );
}
