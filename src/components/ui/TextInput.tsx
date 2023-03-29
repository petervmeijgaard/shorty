import cn from 'classnames';
import { ComponentProps, ForwardedRef, forwardRef, memo } from 'react';

function TextInput(
  { className, ...props }: ComponentProps<'input'>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'flex flex-1 w-full p-4 rounded border border-neutral-900',
        className,
      )}
      {...props}
    />
  );
}

export default memo(forwardRef(TextInput));
