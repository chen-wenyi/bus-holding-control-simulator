'use client';

import useTimer from '@/hooks/useTimer';
import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { useEffect } from 'react';
import OperationProgress from './operationProgress';
import Speedup from './speedup';
import { Button } from './ui/button';

export default function TimePanel() {
  const busTimeTable = useSimStore((state) => state.selectedOutput?.busTimeTable);
  const earliestTime = busTimeTable ? Math.min(...busTimeTable) : 21600; // 06:00:00
  const startSimulation = useSimStore((state) => state.startSimulation);
  const resetSimulation = useSimStore((state) => state.resetSimulation);
  const pauseSimulation = useSimStore((state) => state.pauseSimulation);
  const timer = useSimStore((state) => state.timer);
  const { nextBusIndex, status } = timer;
  const timeElapse = useTimer();
  const updateNextBusIndex = useSimStore((state) => state.updateNextBusIndex);
  const operationBuses = useSimStore((state) => state.busOperation.busesOnRoad);
  const dispatchedBuses = useSimStore(
    (state) => state.busOperation.dispatchedBuses
  );

  const nextBusTime =
  nextBusIndex !== -1 && busTimeTable && nextBusIndex < busTimeTable.length
    ? earliestTime + busTimeTable[nextBusIndex]
    : earliestTime;

  const nextBusDetailedTime = nextBusTime
    ? getDetailedTime(nextBusTime)
    : undefined;

  const outputName = useSimStore((state) => state.selectedOutput?.name);

  const onStart = () => {
    startSimulation();
  };

  const onPause = () => {
    pauseSimulation();
  };

  const onReset = () => {
    resetSimulation();
  };

  useEffect(() => {
    if (
      status !== 'paused' &&
      nextBusIndex !== -1 &&
      nextBusTime &&
      timeElapse &&
      nextBusTime < timeElapse.distance
    ) {
      updateNextBusIndex();
    }
  }, [nextBusIndex, nextBusTime, timeElapse, updateNextBusIndex]);

  return (
    <div className="flex flex-col p-4 w-full " >
      {outputName && (
        <>
          {status === 'idle' ? (
            <Button
            className={`w-full text-white ${
              status === 'idle'
                ? 'bg-[#1B2C3F] hover:bg-[#2A3D54]'
                : ''
            }`}
            onClick={onStart}
          >
            Start Simulation</Button>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <Button variant='destructive' onClick={onReset}>
                Reset Simulation
              </Button>
              {status === 'paused' ? (
                <Button onClick={onStart}>Start</Button>
              ) : (
                <Button variant='default' onClick={onPause}>
                  Pause
                </Button>
              )}
            </div>
          )}

          {timeElapse && (
            <>
              <OperationProgress elapse={timeElapse.distance} />
              <Speedup />
              <div className='flex items-center justify-center text-sm'>
                <div className='px-2'>Next bus at</div>
                {nextBusDetailedTime ? (
                  <>
                    <div>{formatTime(nextBusDetailedTime.hours)}:</div>
                    <div>{formatTime(nextBusDetailedTime.minutes)}:</div>
                    <div>{formatTime(nextBusDetailedTime.seconds)}</div>
                  </>
                ) : (
                  <>-</>
                )}
              </div>

              <div className='flex items-center justify-center text-sm'>
                Dispatched Buses: {dispatchedBuses.length}
              </div>
              <div className='flex items-center justify-center text-sm'>
                Buses on road: {operationBuses.length}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
