import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo } from 'react';

const Base: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => (
  <div
    className={cn('flex flex-1 p-4 rounded text-neutral-50', className)}
    {...props}
  />
);

const Error: FC<ComponentPropsWithoutRef<typeof Base>> = ({
  className,
  ...props
}) => <Base className={cn('bg-red-900', className)} {...props} />;

const Success: FC<ComponentPropsWithoutRef<typeof Base>> = ({
  className,
  ...props
}) => <Base className={cn('bg-green-900', className)} {...props} />;

const Notification = {
  Base: memo(Base),
  Error: memo(Error),
  Success: memo(Success),
};

export default Notification;
