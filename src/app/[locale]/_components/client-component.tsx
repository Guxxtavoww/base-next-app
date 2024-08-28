'use client';

import { useTranslations } from '@/contexts/translations.context';
import { LanguageDropdown } from '@/components/tools/language-dropdown';

export function ClientComponent() {
  const { translation } = useTranslations();

  return (
    <div className="mt-4 border rounded-sm p-3">
      <h3 className="text-destructive w-96">
        {translation('common_texts.client_component')}
      </h3>
      <LanguageDropdown />
    </div>
  );
}
