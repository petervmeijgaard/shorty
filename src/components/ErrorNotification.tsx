import cn from 'classnames';
import { HTMLAttributes } from 'react';
import BaseNotification from './BaseNotification';

const ErrorNotification = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <BaseNotification className={cn('bg-red-900', className)} {...props} />
);

export default ErrorNotification;
