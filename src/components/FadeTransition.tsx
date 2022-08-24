import { animated, useTransition } from '@react-spring/web';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  readonly isVisible: boolean;
  readonly duration?: number;
};

const FadeTransition = ({
  duration = 500,
  isVisible,
  style,
  ...props
}: Props) => {
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
