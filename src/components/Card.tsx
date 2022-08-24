import cn from 'classnames';
import { HTMLAttributes } from 'react';

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col w-full p-8 gap-4 rounded border bg-slate-50',
      className,
    )}
    {...props}
  />
);

export default Card;
