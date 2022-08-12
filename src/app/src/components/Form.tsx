import { FC, FormHTMLAttributes } from 'react';
import cn from 'classnames';

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({ className, ...props }) => (
  <form className={cn('flex flex-1 flex-row gap-4', className)} {...props} />
);

export default Form;
