import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';
import BaseNotification from './BaseNotification';

const ErrorNotification: FC<
  ComponentPropsWithoutRef<typeof BaseNotification>
> = ({ className, ...props }) => (
  <BaseNotification className={cn('bg-red-900', className)} {...props} />
);

export default ErrorNotification;
