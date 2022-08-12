import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import BaseNotification from './BaseNotification';

export const SuccessNotification: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <BaseNotification className={cn('bg-green-900', className)} {...props} />
);

export default SuccessNotification;
