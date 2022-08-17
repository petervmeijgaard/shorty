import cn from 'classnames';
import { FC, FormHTMLAttributes } from 'react';

const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  className,
  ...props
}) => (
  <form
    className={cn('flex flex-1 flex-col items-start gap-4', className)}
    {...props}
  />
);

export default Form;
