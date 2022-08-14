import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={cn(
      'flex p-4 h-full items-center rounded bg-slate-900 hover:bg-slate-800 transition-colors text-slate-50 disabled:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
);

export default Button;
