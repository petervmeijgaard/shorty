import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={cn('flex flex-1 w-full p-4 rounded border border-slate-900', className)}
    {...props}
  />
);

export default TextInput;
