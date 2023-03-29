import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function TableHeaderCell({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cn('p-2 font-bold', className)} {...props} />;
}

export default memo(TableHeaderCell);
