import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-full p-8 gap-4 rounded border bg-neutral-50',
        className,
      )}
      {...props}
    />
  );
}

export default memo(Card);
