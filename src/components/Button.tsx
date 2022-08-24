import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'flex p-4 h-full items-center rounded bg-slate-900 hover:bg-slate-800 transition-colors text-slate-50 disabled:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
);

export default Button;
