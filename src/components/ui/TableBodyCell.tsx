import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function TableBodyCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      className={cn('p-2 font-light text-neutral-700', className)}
      {...props}
    />
  );
}

export default memo(TableBodyCell);
