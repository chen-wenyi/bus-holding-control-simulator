import { calculateTimeElapsed } from '@/lib/utils';
import { TimeElapsed } from '@/types';
import { useEffect, useState } from 'react';

export default function useTimer(timestamp?: number, multiplier: number = 1) {
  const [timeElapse, setTimeElapse] = useState<TimeElapsed | null>(
    timestamp ? calculateTimeElapsed(timestamp, multiplier) : null
  );

  useEffect(() => {
    if (!timestamp) return;
    const interval = setInterval(() => {
      setTimeElapse(calculateTimeElapsed(timestamp, multiplier));
    }, 1000 / multiplier);

    return () => clearInterval(interval);
  }, [timestamp, timeElapse]);

  return timeElapse;
}
