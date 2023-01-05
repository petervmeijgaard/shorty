import cn from 'classnames';
import { forwardRef, ComponentPropsWithoutRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex flex-1 w-full p-4 rounded border border-neutral-900',
      className,
    )}
    {...props}
  />
));

// eslint-disable-next-line functional/immutable-data
TextInput.displayName = 'TextInput';

export default TextInput;
