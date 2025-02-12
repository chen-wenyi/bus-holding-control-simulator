import { getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const timer = useSimStore((state) => state.timer);
  const { breakpoint } = useSimStore((state) => state.busOperation);
  const setTimerStatus = useSimStore((state) => state.setTimerStatus);
  const setOperationTime = useSimStore((state) => state.setOperationTime);

  const { multiplier, status } = timer;
  const totalOperationTime = useSimStore(
    (state) => state.selectedOutput?.totalOperationTime
  );

  const requestRef = useRef<number>(null);
  const startTime = useRef(-1);
  const [time, setTime] = useState(0);

  const animate = () => {
    if (status === 'paused') {
      return;
    }
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime.current) * multiplier;

    if (
      totalOperationTime &&
      elapsedTime >= (totalOperationTime - breakpoint) * 1000
    ) {
      setTimerStatus('ended');
    } else {
      setTime(elapsedTime / 1000);
      setOperationTime(elapsedTime / 1000);
      requestRef.current = requestAnimationFrame(animate); // Request the next frame
    }
  };

  useEffect(() => {
    if (status === 'started') {
      startTime.current = performance.now();
      // Start the animation
      requestRef.current = requestAnimationFrame(animate);
    } else if (status === 'idle') {
      setTime(0);
    } else if (status === 'ended') {
      // if (totalOperationTime) {
      //   setTime(totalOperationTime);
      // }
    } else if (status === 'paused') {
      setTime(0);
    }

    return () => {
      // Cleanup the animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [status, totalOperationTime, breakpoint]);

  const { days, hours, minutes, seconds } = getDetailedTime(breakpoint + time);

  return {
    days,
    hours,
    minutes,
    seconds,
    distance: time + breakpoint,
  };
}
