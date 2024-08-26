import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectFieldProps<
  TData extends Record<string, any>,
  Keys extends keyof TData = keyof TData
> {
  name: string;
  defaultValue?: TData[Keys];
  options: TData[];
  disabled?: boolean;
  labelAccessor: Keys;
  valueAccessor: Keys;
  selectLabel?: string;
  placeholder?: string;
  className?: string;
}

export function SelectField<T extends Record<string, any>>({
  labelAccessor,
  name,
  options,
  valueAccessor,
  defaultValue,
  disabled,
  selectLabel,
  placeholder,
  className,
}: SelectFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={className}>
          {selectLabel ? <FormLabel>{selectLabel}</FormLabel> : null}
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={field.disabled}
            name={field.name}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || 'Selecione'} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem
                  value={String(option[valueAccessor])}
                  key={index}
                  className="cursor-pointer"
                >
                  {String(option[labelAccessor])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
