import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col p-8 gap-4 rounded border bg-slate-50', className)}
    {...props}
  />
);

export default Card;
