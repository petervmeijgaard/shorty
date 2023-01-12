import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo } from 'react';

const BodyTableCell: FC<ComponentPropsWithoutRef<'td'>> = ({
  className,
  ...props
}) => (
  <td className={cn('p-2 font-light text-neutral-700', className)} {...props} />
);

export default memo(BodyTableCell);
