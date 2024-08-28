'use client';

import { useState, forwardRef, memo, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/utils/cn.util';

import { lucide-reactIcon } from '../lucide-react-icon';
import { Input, type InputProps } from '../../ui/input';

export type PasswordInputTypes = 'password' | 'text';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'ref'> {
  defaultType?: PasswordInputTypes;
}

const PasswordInputComponent = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, defaultType = 'password', ...rest }, ref) => {
    const [inputType, setInputType] = useState<PasswordInputTypes>(defaultType);

    const toggleInputType = useCallback(() => {
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
    }, [setInputType]);

    return (
      <div className="relative flex items-center flex-1">
        <Input
          className={cn('pr-8 rounded-xl', className)}
          type={inputType}
          ref={ref}
          {...rest}
        />
        <button
          className="absolute right-0 mr-2.5"
          type="button"
          disabled={rest.disabled}
          tabIndex={-1}
          onClick={toggleInputType}
          aria-label={`Toggle password visibility`}
        >
          <lucide-reactIcon
            icon={inputType === 'password' ? EyeOff : Eye}
            size="sm"
          />
        </button>
      </div>
    );
  }
);
PasswordInputComponent.displayName = 'PasswordInput';

export const PasswordInput = memo(
  PasswordInputComponent
) as typeof PasswordInputComponent;
