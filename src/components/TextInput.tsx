import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

const TextInput = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex flex-1 w-full p-4 rounded border border-slate-900',
      className,
    )}
    {...props}
  />
));

// eslint-disable-next-line functional/immutable-data
TextInput.displayName = 'TextInput';

export default TextInput;
