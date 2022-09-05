import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

const Overlay = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'flex flex-1 inset-0 justify-center items-center fixed bg-slate-900/75 backdrop-blur-md',
      className,
    )}
    {...props}
  />
);

export default Overlay;
