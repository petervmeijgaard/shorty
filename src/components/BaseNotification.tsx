import cn from 'classnames';
import { HTMLAttributes } from 'react';

const BaseNotification = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-1 p-4 rounded text-slate-50', className)}
    {...props}
  />
);

export default BaseNotification;
