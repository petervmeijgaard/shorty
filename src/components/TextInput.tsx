import cn from 'classnames';
import { InputHTMLAttributes } from 'react';

const TextInput = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'flex flex-1 w-full p-4 rounded border border-slate-900',
      className,
    )}
    {...props}
  />
);

export default TextInput;
