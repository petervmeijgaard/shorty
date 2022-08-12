import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import BaseNotification from './BaseNotification';

export const ErrorNotification: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <BaseNotification className={cn('bg-red-900', className)} {...props} />
);

export default ErrorNotification;
