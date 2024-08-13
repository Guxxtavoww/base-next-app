'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFieldId } from '@/hooks/use-field-id.hook';
import { Input, type InputProps } from '@/components/ui/input';

import PasswordInput from './password-input';

export type InputFieldProps = Omit<
  InputProps,
  'name' | 'defaultChecked' | 'id' | 'checked' | 'defaultChecked'
> & {
  name: string;
  label?: string;
  isRequired?: boolean;
};

export function InputField({
  name,
  type = 'text',
  className,
  defaultValue = '',
  label,
  disabled,
  isRequired,
  ...rest
}: InputFieldProps): JSX.Element {
  const id = useFieldId(name);
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field: { onChange, value = '', ...field } }) => (
        <FormItem className="grid w-full items-center gap-1.5">
          {label ? (
            <FormLabel htmlFor={id} className="relative">
              {label}
              {isRequired ? (
                <strong className="absolute -top-0.5 text-red-600">*</strong>
              ) : null}
            </FormLabel>
          ) : null}
          {type === 'password' ? (
            <PasswordInput
              {...rest}
              {...field}
              value={value}
              className={className}
              onChange={onChange}
              id={id}
              autoComplete={`current-${name}`}
            />
          ) : (
            <Input
              {...rest}
              {...field}
              value={value}
              className={className}
              onChange={(e) => {
                const inputValue = e.target.value;
                onChange(type === 'number' ? +inputValue : inputValue);
              }}
              type={type}
              id={id}
              autoComplete={`current-${name}`}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
