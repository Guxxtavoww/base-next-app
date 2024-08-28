'use client';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales } from '@/config/i18n.config';
import { useTranslations } from '@/contexts/translations.context';

import { Button } from '../ui/button';

export function LanguageDropdown() {
  const { translation, changeTranslation } = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-4">
        <Button variant="outline">
          {translation('common_texts.change_lang')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((item) => (
          <DropdownMenuItem key={item} onClick={() => changeTranslation(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
