import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';

const BaseNotification: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex flex-1 p-4 rounded text-slate-50', className)}
    {...props}
  />
);

export default BaseNotification;
