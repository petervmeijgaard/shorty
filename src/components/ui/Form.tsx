import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function Form({ className, ...props }: ComponentProps<'form'>) {
  return (
    <form
      className={cn('flex flex-1 flex-col items-start gap-4', className)}
      {...props}
    />
  );
}

export default memo(Form);
