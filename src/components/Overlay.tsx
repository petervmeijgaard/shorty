import cn from 'classnames';
import { HTMLAttributes } from 'react';

const Overlay = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-1 inset-0 justify-center items-center fixed bg-slate-900/75 backdrop-blur-md',
      className,
    )}
    {...props}
  />
);

export default Overlay;
