import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const Shimmer: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('animate-pulse rounded bg-neutral-200', className)}
    {...props}
  />
);

export default Shimmer;
