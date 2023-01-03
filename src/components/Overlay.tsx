import cn from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

const Overlay: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-1 inset-0 justify-center items-center fixed bg-slate-900/75 backdrop-blur-md',
      className,
    )}
    {...props}
  />
);

export default Overlay;
