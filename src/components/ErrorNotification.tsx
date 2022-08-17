import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';
import BaseNotification from './BaseNotification';

const ErrorNotification: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <BaseNotification className={cn('bg-red-900', className)} {...props} />;

export default ErrorNotification;
