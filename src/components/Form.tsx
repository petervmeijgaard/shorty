import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const Form: FC<ComponentPropsWithoutRef<'form'>> = ({
  className,
  ...props
}) => (
  <form
    className={cn('flex flex-1 flex-col items-start gap-4', className)}
    {...props}
  />
);

export default Form;
