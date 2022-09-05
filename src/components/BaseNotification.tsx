import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

const BaseNotification = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('flex flex-1 p-4 rounded text-slate-50', className)}
    {...props}
  />
);

export default BaseNotification;
