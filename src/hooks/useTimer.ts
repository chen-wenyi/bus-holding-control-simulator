import { calculateTimeElapsed } from '@/lib/utils';
import { TimeElapsed } from '@/types';
import { useEffect, useState } from 'react';

export default function useTimer(isStarted: boolean, multiplier: number) {
  const [timeElapse, setTimeElapse] = useState<TimeElapsed>(
    calculateTimeElapsed(-1)
  );

  useEffect(() => {
    if (!isStarted) return;
    const interval = setInterval(() => {
      setTimeElapse(calculateTimeElapsed(timeElapse.distance));
    }, 1000 / multiplier);

    return () => clearInterval(interval);
  }, [timeElapse, multiplier, isStarted]);

  return timeElapse;
}
