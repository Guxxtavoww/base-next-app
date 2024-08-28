'use client';

import { useTranslations } from '@/contexts/translations.context';

export function ClientComponent() {
  const { translation } = useTranslations();

  return (
    <div className="mt-4">
      <h3 className="text-destructive w-80">
        {translation('common_texts.client_component')}
      </h3>
    </div>
  );
}
