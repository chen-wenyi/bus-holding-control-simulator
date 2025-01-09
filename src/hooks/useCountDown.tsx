import { calculateTimeLeft } from '@/lib/utils';
import { TimeLeft } from '@/types';
import { useEffect, useState } from 'react';

export default function useCountdown({
  timestamp,
  onTimeup,
  multiplier = 1,
}: {
  timestamp?: number;
  onTimeup?: () => void;
  multiplier: number;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    timestamp ? calculateTimeLeft(timestamp, multiplier) : null
  );

  useEffect(() => {
    if (!timestamp || (timeLeft && timeLeft.distance <= 0)) {
      setTimeLeft(null);
      if (onTimeup) {
        onTimeup();
      }
      return;
    } // Stop the countdown when time is up

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp, multiplier));
    }, 1000 / multiplier);

    // Cleanup the interval when the component unmounts or time is up
    return () => clearInterval(timer);
  }, [timeLeft, timestamp]);

  return timeLeft;
}
