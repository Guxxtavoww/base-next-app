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
      <Label>{translation('default.common_texts.change_lang')}</Label>
      <Select value={currentLocale} onValueChange={changeTranslation}>
        <SelectTrigger className="max-w-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
