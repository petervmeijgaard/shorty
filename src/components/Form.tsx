import cn from 'classnames';
import { FormHTMLAttributes } from 'react';

const Form = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => (
  <form
    className={cn('flex flex-1 flex-col items-start gap-4', className)}
    {...props}
  />
);

export default Form;
