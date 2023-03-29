import cn from 'classnames';
import { ComponentProps, memo } from 'react';

function Overlay({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-1 inset-0 justify-center items-center fixed bg-neutral-900/75 backdrop-blur-md',
        className,
      )}
      {...props}
    />
  );
}

export default memo(Overlay);
