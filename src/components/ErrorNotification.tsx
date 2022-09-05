import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import BaseNotification from './BaseNotification';

const ErrorNotification = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNotification>) => (
  <BaseNotification className={cn('bg-red-900', className)} {...props} />
);

export default ErrorNotification;
