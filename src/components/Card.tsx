import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';

const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col w-full p-8 gap-4 rounded border bg-slate-50',
      className,
    )}
    {...props}
  />
);

export default Card;
