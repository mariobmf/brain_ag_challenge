'use client';
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { UseFormRegister, FieldValues, ErrorOption } from 'react-hook-form';
import classNames from 'classnames';
import { cpf, cell_phone, cpf_cnpj } from './masks';

type MaskType = 'cpf' | 'cell_phone' | 'cpf_cnpj';

interface InputTextMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
  label?: string;
  register?: UseFormRegister<FieldValues>;
  error?: ErrorOption;
  filled?: boolean;
}

const MASKS = {
  cpf,
  cell_phone,
  cpf_cnpj,
};

const InputTextMask = React.forwardRef<HTMLInputElement, InputTextMaskProps>(
  (
    { mask, prefix, label, filled, onChange, error, className, ...rest },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const filledOrFocused = useMemo(() => {
      return filled || isFocused;
    }, [filled, isFocused]);

    const handleKeyUp = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        MASKS[mask](e);
        return e;
      },
      [mask],
    );

    const applyMask = (event: ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange === 'undefined') {
        handleKeyUp(event);
      } else {
        onChange?.(handleKeyUp(event));
      }
    };

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
          onChange={applyMask}
          ref={ref}
          data-state={error ? 'error' : ''}
          className={classNames(
            'h-[40px] w-full rounded-xl border-[1px] border-zinc-700 bg-slate-300 px-3 text-base font-medium text-zinc-700 placeholder-zinc-400 outline-none disabled:opacity-50 data-[state=error]:border-2 data-[state=error]:border-red-500',
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

InputTextMask.displayName = 'InputTextMask';

export { InputTextMask };
