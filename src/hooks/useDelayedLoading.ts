import { useTimeout } from './useTimeout';
import { useCallback, useEffect, useState } from 'react';

export const useDelayedLoading = (isLoading: boolean, delay: number = 500): boolean => {
  const [derivedIsLoading, setDerivedIsLoading] = useState(false);
  const timeout = useTimeout();

  const startTimer = useCallback(() => {
    timeout.start(() => setDerivedIsLoading(true), delay);
  }, [delay, timeout.start]);

  const stopTimer = useCallback(() => {
    timeout.clear();

    setDerivedIsLoading(false);
  }, [timeout.clear]);

  useEffect(() => {
    if (isLoading) {
      startTimer();
    }

    if (!isLoading) {
      stopTimer();
    }
  }, [isLoading, startTimer, stopTimer]);

  return derivedIsLoading;
};

export default useDelayedLoading;
