'use client';
import classNames from 'classnames';
import React, { InputHTMLAttributes, useMemo, useState } from 'react';
import { ErrorOption, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegister<FieldValues>;
  error?: ErrorOption;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, error, className, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="flex w-full flex-col items-start">
        {label && (
          <span
            data-testid="input-text-label"
            className="mb-2 font-bold text-zinc-700"
          >
            {label}
          </span>
        )}
        <input
          ref={ref}
          data-state={error ? 'error' : ''}
          className={classNames(
            'h-[40px] w-full rounded-xl border-[1px] border-zinc-700 bg-slate-300 px-3 text-base font-medium text-zinc-700 placeholder-zinc-400 outline-none data-[state=error]:border-2 data-[state=error]:border-red-500',
            className,
          )}
          placeholder={label || rest.placeholder}
          type="text"
          onFocus={() => setIsFocused(true)}
          {...rest}
          onBlur={event => {
            setIsFocused(false);
            rest.onBlur?.(event);
          }}
        />
        {error && (
          <span
            className="mt-1 text-base text-red-500"
            data-testid="input-text-error"
          >
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export { InputText };
