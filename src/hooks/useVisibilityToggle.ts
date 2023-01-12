import { useCallback, useState } from 'react';

const useVisibilityToggle = (initialValue = false) => {
  const [isVisible, setIsVisible] = useState(initialValue);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible(value => !value);
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

export default useVisibilityToggle;
