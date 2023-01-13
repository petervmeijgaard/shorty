import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo } from 'react';

const Card: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex w-full p-8 gap-4 rounded border bg-neutral-50',
      className,
    )}
    {...props}
  />
);

export default memo(Card);
