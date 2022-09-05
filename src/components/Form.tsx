import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

const Form = ({ className, ...props }: ComponentPropsWithoutRef<'form'>) => (
  <form
    className={cn('flex flex-1 flex-col items-start gap-4', className)}
    {...props}
  />
);

export default Form;
