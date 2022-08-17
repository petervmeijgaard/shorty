import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';
import BaseNotification from './BaseNotification';

const SuccessNotification: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <BaseNotification className={cn('bg-green-900', className)} {...props} />;

export default SuccessNotification;
