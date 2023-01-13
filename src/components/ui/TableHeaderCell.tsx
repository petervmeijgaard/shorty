import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo } from 'react';

const TableHeaderCell: FC<ComponentPropsWithoutRef<'th'>> = ({
  className,
  ...props
}) => <td className={cn('p-2 font-bold', className)} {...props} />;

export default memo(TableHeaderCell);
