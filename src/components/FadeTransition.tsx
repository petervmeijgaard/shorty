import { useTransition, animated } from '@react-spring/web';
import { FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  isVisible?: boolean;
  duration?: number;
}

export const FadeTransition: FC<Props> = ({ duration = 500, isVisible = false, style, children, ...props }) => {
  const transitions = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isVisible,
    config: { duration },
  });

  return transitions(
    (transitionStyle, item) => item && (
      <animated.div
        style={{ ...transitionStyle, ...style, }}
        {...props}
      >
        {children}
      </animated.div>
    ));
};

export default FadeTransition;
