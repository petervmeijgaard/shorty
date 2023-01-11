import { animated, useTransition } from '@react-spring/web';
import { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
  readonly isVisible: boolean;
  readonly duration?: number;
};

const FadeTransition: FC<Props> = ({
  duration = 150,
  isVisible,
  style,
  ...props
}) => {
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
};

export default FadeTransition;
