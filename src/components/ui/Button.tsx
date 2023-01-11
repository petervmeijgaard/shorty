import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const Button: FC<ComponentPropsWithoutRef<'button'>> = ({
  className,
  ...props
}) => (
  <button
    className={cn(
      'flex p-4 h-full items-center rounded bg-neutral-900 hover:bg-neutral-800 transition-colors text-neutral-50 disabled:hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
);

export default Button;
