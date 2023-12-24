'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { ErrorOption } from 'react-hook-form';
import Select, { Props } from 'react-select';

type SelectValueType = {
  value: string;
  label: string;
};

interface InputSelectProps extends Props {
  options: SelectValueType[];
  placeholder?: string;
  label?: string;
  error?: ErrorOption;
  className?: string;
}

const controlStyles = {
  base: 'rounded-xl bg-slate-300 px-3 min-h-[40px]',
  withoutError: 'border-zinc-700 border-[1px]',
  error: 'border-red-500 border-2',
};
const menuStyles = 'border border-zinc-300 bg-slate-300 rounded-xl';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-slate-400 active:bg-slate-400',
  selected: "after:content-['✔'] after:ml-2 after:text-primary font-medium",
};
const valueContainerStyle = 'text-base font-medium text-zinc-700 gap-1 p-1';
const multiValueStyles = 'bg-primary rounded items-center px-1';
const multiValueLabelStyles = 'text-white text-base font-medium';
const multiValueRemoveStyles = 'hover:text-red-500 text-white ml-1';

const InputSelect = React.forwardRef<any, InputSelectProps>(
  (
    {
      options,
      placeholder,
      error,
      label,
      className,
      value,
      onChange,
      isMulti = false,
      ...rest
    },
    ref,
  ) => {
    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
      <div className="flex w-full flex-col items-start">
        {label && (
          <span
            data-testid="input-text-label"
            className="mb-2 font-bold text-zinc-700"
          >
            {label}
          </span>
        )}

        <Select
          {...rest}
          ref={ref}
          id={id}
          unstyled
          classNames={{
            container: () => clsx('w-full'),
            control: () =>
              clsx(
                error ? controlStyles.error : controlStyles.withoutError,
                controlStyles.base,
              ),
            placeholder: () => clsx('text-zinc-400'),
            valueContainer: () => clsx(valueContainerStyle),
            menu: () => menuStyles,
            option: ({ isFocused, isSelected }) =>
              clsx(
                isFocused && optionStyles.focus,
                isSelected && optionStyles.selected,
                optionStyles.base,
              ),
            multiValue: () => multiValueStyles,
            multiValueLabel: () => multiValueLabelStyles,
            multiValueRemove: () => multiValueRemoveStyles,
          }}
          options={options}
          value={
            isMulti
              ? options.filter(att => (value as string[])?.includes(att.value))
              : options.filter(item => item.value === value)
          }
          onChange={(item: any, actionMeta) => {
            if (isMulti)
              onChange?.(
                item.map((option: any) => option.value),
                actionMeta,
              );
            else {
              onChange?.(item.value, actionMeta);
            }
          }}
          placeholder={placeholder ?? 'Selecione...'}
          isMulti={isMulti}
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
    ) : null;
  },
);

InputSelect.displayName = 'InputSelect';

export { InputSelect };
