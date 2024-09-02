'use client';

import { CustomLink } from '@/components/tools/custom-link';
import { Loader } from '@/components/tools/loader';
import { useTranslations } from '@/contexts/translations.context';

export default function NotFound() {
  const { translation, isLoading } = useTranslations();

  if (isLoading) {
    return (
      <div className="w-full min-h-svh grid place-items-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-5 text-center">
      <h2>{translation('not_found_page_texts.title')}</h2>
      <p>{translation('not_found_page_texts.description')}</p>
      <CustomLink href="/" className="max-w-fit">
        {translation('not_found_page_texts.button_text')}
      </CustomLink>
    </div>
  );
}
