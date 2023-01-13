import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo } from 'react';

const Overlay: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-1 inset-0 justify-center items-center fixed bg-neutral-900/75 backdrop-blur-md',
      className,
    )}
    {...props}
  />
);

export default memo(Overlay);
