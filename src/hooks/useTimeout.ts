import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback((callback: () => void, duration: number) => {
    timer.current = setTimeout(callback, duration);
  }, []);

  const clear = useCallback(() => {
    if (timer.current === null) return;

    clearTimeout(timer.current);

    timer.current = null;
  }, []);

  useEffect(() => () => clear(), [clear]);

  return {
    start,
    clear,
  };
};

export default useTimeout;
