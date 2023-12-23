import { ButtonHTMLAttributes } from 'react';
import { Spinner } from '../Spinner';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

export function Button({ label, isLoading, className, ...rest }: ButtonProps) {
  return (
    <button
      className={classNames(
        'flex w-full items-center justify-center rounded-xl bg-secondary p-4 text-xl font-bold text-white hover:opacity-70 disabled:pointer-events-none disabled:bg-gray-400 disabled:text-zinc-500',
        className,
      )}
      {...rest}
    >
      {isLoading ? <Spinner /> : label}
    </button>
  );
}
