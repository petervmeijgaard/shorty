import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import BaseNotification from './BaseNotification';

const SuccessNotification = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNotification>) => (
  <BaseNotification className={cn('bg-green-900', className)} {...props} />
);

export default SuccessNotification;
