import cn from 'classnames';
import { HTMLAttributes } from 'react';
import BaseNotification from './BaseNotification';

const SuccessNotification = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <BaseNotification className={cn('bg-green-900', className)} {...props} />
);

export default SuccessNotification;
