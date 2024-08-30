'use client';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales } from '@/config/i18n.config';
import { useTranslations } from '@/contexts/translations.context';

import { Label } from '../ui/label';

export function LanguageDropdown() {
  const { translation, changeTranslation, currentLocale } = useTranslations();

  return (
    <div className="flex flex-col mt-4 gap-3.5">
      <Label htmlFor="language">
        {translation('common_texts.change_lang')}
      </Label>
      <Select value={currentLocale} onValueChange={changeTranslation}>
        <SelectTrigger className="max-w-xs" id="language">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
