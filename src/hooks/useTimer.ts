import { getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const timer = useSimStore((state) => state.timer);
  const { breakpoint, offset } = useSimStore((state) => state.busOperation);
  const setTimerStatus = useSimStore((state) => state.setTimerStatus);
  const setOperationTime = useSimStore((state) => state.setOperationTime);
  const { multiplier, status } = timer;
  const totalOperationTime = useSimStore((state) => state.selectedOutput?.totalOperationTime);
  const requestRef = useRef<number>(null);
  const startTime = useRef(-1);
  const [time, setTime] = useState(offset);

  useEffect(() => {
    setTime(offset);
  }, []);

  const animate = () => {
    if (status === 'paused') return;
    
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime.current) * multiplier;

    if (totalOperationTime && elapsedTime / 1000 >= totalOperationTime) {
      setTimerStatus('ended');
    } else {
      setTime(offset + breakpoint + elapsedTime / 1000);
      setOperationTime(breakpoint + elapsedTime / 1000);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (status === 'started') {
      startTime.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else if (status === 'idle') {
      setTime(offset);
    } else if (status === 'paused') {
      setTime(offset + breakpoint);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [status, totalOperationTime]);

  const { hours, minutes, seconds } = getDetailedTime(time);
  return {
    hours,
    minutes,
    seconds,
    distance: time,
  };
}
