import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const TableBodyCell: FC<ComponentPropsWithoutRef<'td'>> = ({
  className,
  ...props
}) => (
  <td className={cn('p-2 font-light text-neutral-700', className)} {...props} />
);

export default TableBodyCell;
