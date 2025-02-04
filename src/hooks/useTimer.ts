import { getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const timer = useSimStore((state) => state.timer);
  const { breakpoint } = useSimStore((state) => state.busOperation);
  const setTimerStatus = useSimStore((state) => state.setTimerStatus);
  const setOperationTime = useSimStore((state) => state.setOperationTime);
  const { multiplier, status } = timer;
  const totalOperationTime = useSimStore((state) => state.selectedOutput?.totalOperationTime);
  const busTimeTable = useSimStore((state) => state.selectedOutput?.busTimeTable);

  const earliestTime = busTimeTable && busTimeTable.length > 0 ? Math.min(...busTimeTable) : 21600;

  const requestRef = useRef<number>(null);
  const startTime = useRef(-1);
  const elapsedTimeBeforePause = useRef(0);

  const [time, setTime] = useState(() => earliestTime);


  useEffect(() => {
    if (busTimeTable && busTimeTable.length > 0) {
      setTime(earliestTime);
      elapsedTimeBeforePause.current = 0;
    }
  }, [busTimeTable]);

  const animate = () => {
    if (status === 'paused') return;

    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime.current) * multiplier;

    if (totalOperationTime && elapsedTime + elapsedTimeBeforePause.current >= totalOperationTime * 1000) {
      setTimerStatus('ended');
    } else {
      const newTime = earliestTime + elapsedTimeBeforePause.current + elapsedTime / 1000;
      setTime(newTime);
      setOperationTime(newTime);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (status === 'started') {
      startTime.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else if (status === 'idle') {
      setTime(earliestTime);
      elapsedTimeBeforePause.current = 0;
    } else if (status === 'ended') {
      if (totalOperationTime) setTime(earliestTime + totalOperationTime);
    } else if (status === 'paused') {
      elapsedTimeBeforePause.current = time - earliestTime;
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
    distance: time - earliestTime,
  };
}
