import cn from 'classnames';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  memo,
} from 'react';

const TextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
> = ({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex flex-1 w-full p-4 rounded border border-neutral-900',
      className,
    )}
    {...props}
  />
);

export default memo(forwardRef(TextInput));
