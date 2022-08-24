import { useCallback, useEffect, useState } from 'react';
import { useTimeout } from './useTimeout';

export const useDelayedLoading = (isLoading: boolean, delay = 500) => {
  const [derivedIsLoading, setDerivedIsLoading] = useState(false);
  const timeout = useTimeout();

  const startTimer = useCallback(() => {
    timeout.start(() => setDerivedIsLoading(true), delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, timeout.start]);

  const stopTimer = useCallback(() => {
    timeout.clear();

    setDerivedIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
