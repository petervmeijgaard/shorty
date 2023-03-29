import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function Base({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-1 p-4 rounded text-neutral-50', className)}
      {...props}
    />
  );
}

function Error({ className, ...props }: ComponentProps<typeof Base>) {
  return <Base className={cn('bg-red-900', className)} {...props} />;
}

function Success({ className, ...props }: ComponentProps<typeof Base>) {
  return <Base className={cn('bg-green-900', className)} {...props} />;
}

const Notification = {
  Base: memo(Base),
  Error: memo(Error),
  Success: memo(Success),
};

export default Notification;
