import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const BaseNotification: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex flex-1 p-4 rounded text-neutral-50', className)}
    {...props}
  />
);

export default BaseNotification;
