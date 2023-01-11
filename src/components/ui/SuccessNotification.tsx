import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';
import BaseNotification from './BaseNotification';

const SuccessNotification: FC<
  ComponentPropsWithoutRef<typeof BaseNotification>
> = ({ className, ...props }) => (
  <BaseNotification className={cn('bg-green-900', className)} {...props} />
);

export default SuccessNotification;
