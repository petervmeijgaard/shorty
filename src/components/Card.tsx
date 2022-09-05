import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

const Card = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'flex flex-col w-full p-8 gap-4 rounded border bg-slate-50',
      className,
    )}
    {...props}
  />
);

export default Card;
