import classNames from 'classnames';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      role="contentinfo"
      className={classNames(
        'relative w-full max-w-[600px] rounded-md bg-slate-300 p-4 shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
