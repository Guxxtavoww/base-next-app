'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFieldId } from '@/hooks/use-field-id.hook';
import { Input, type InputProps } from '@/components/ui/input';

export type InputFieldWithMaskProps = Omit<
  InputProps,
  'name' | 'defaultChecked' | 'id' | 'type' | 'checked' | 'defaultChecked'
> & {
  name: string;
  label?: string;
  isRequired?: boolean;
  // eslint-disable-next-line no-unused-vars
  maskFn: (value: string) => string | undefined;
};

export function InputFieldWithMask({
  name,
  className,
  defaultValue = '',
  label,
  disabled,
  maskFn,
  isRequired,
  ...rest
}: InputFieldWithMaskProps): JSX.Element {
  const id = useFieldId(name);
  const { control } = useFormContext();

  const applyMask = useCallback(
    (value: string) => {
      const maskedValue = maskFn(value);

      if (!maskedValue && value.length) return;

      return maskedValue;
    },
    [maskFn]
  );

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field: { onChange, value = '', ...field } }) => (
        <FormItem>
          {label ? (
            <FormLabel htmlFor={id} className="relative">
              {label}
              {isRequired ? (
                <strong className="absolute -top-0.5 text-red-600">*</strong>
              ) : null}
            </FormLabel>
          ) : null}
          <Input
            {...rest}
            {...field}
            value={value}
            className={className}
            onChange={(e) => onChange(applyMask(e.target.value))}
            type="text"
            id={id}
            autoComplete={`current-${name}`}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
