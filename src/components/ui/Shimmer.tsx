import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function Shimmer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-neutral-200', className)}
      {...props}
    />
  );
}

export default memo(Shimmer);
