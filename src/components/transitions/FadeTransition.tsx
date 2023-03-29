import { animated, useTransition } from '@react-spring/web';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'> &
  Readonly<{
    isVisible: boolean;
    duration?: number;
  }>;

function FadeTransition({ duration = 150, isVisible, style, ...props }: Props) {
  const transitions = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isVisible,
    config: { duration },
  });

  return transitions(
    (transitionStyle, item) =>
      item && (
        <animated.div style={{ ...transitionStyle, ...style }} {...props} />
      ),
  );
}

export default FadeTransition;
