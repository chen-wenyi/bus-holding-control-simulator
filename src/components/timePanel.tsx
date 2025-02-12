'use client';

import useTimer from '@/hooks/useTimer';
import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { useEffect } from 'react';
import OperationProgress from './operationProgress';
import BusStatistics from "./BusStatistics"; 
import Speedup from './speedup';
import { Button } from './ui/button';

export default function TimePanel() {
  const busTimeTable = useSimStore(
    (state) => state.selectedOutput?.busTimeTable
  );
  const startSimulation = useSimStore((state) => state.startSimulation);
  const resetSimulation = useSimStore((state) => state.resetSimulation);
  const pauseSimulation = useSimStore((state) => state.pauseSimulation);
  const timer = useSimStore((state) => state.timer);
  const { nextBusIndex, status } = timer;
  const updateNextBusIndex = useSimStore((state) => state.updateNextBusIndex);
  const operationBuses = useSimStore((state) => state.busOperation.busesOnRoad);
  const offset = useSimStore((state) => state.busOperation.offset);
  const dispatchedBuses = useSimStore(
    (state) => state.busOperation.dispatchedBuses
  );

  const nextBusTime =
    nextBusIndex !== -1 ? busTimeTable?.[nextBusIndex] : undefined;

  const nextBusDetailedTime = nextBusTime
    ? getDetailedTime(nextBusTime)
    : undefined;

  const outputName = useSimStore((state) => state.selectedOutput?.name);
  const timeElapse = useTimer();

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
    <div className='flex flex-col p-4 w-full'>
      {outputName && (
        <>
          {status === 'idle' ? (
            <Button
            className={`w-full text-white ${
              status === 'idle' ? 'bg-[#1B2C3F] hover:bg-[#2A3D54]' : ''
            }`}
            onClick={onStart}
          >
            Start Simulation</Button>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <Button variant='destructive' onClick={onReset}>
                Reset Simulation
              </Button>
              {status === 'ended' ? (
                <></>
              ) : status === 'paused' ? (
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
              <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="whitespace-nowrap">Next bus at:</div>
              <div className="text-center">
                {nextBusDetailedTime ? (
                  <>
                    {formatTime(nextBusDetailedTime.hours + offset / 3600)}:
                    {formatTime(nextBusDetailedTime.minutes)}:
                    {formatTime(nextBusDetailedTime.seconds)}
                  </>
                ) : (
                  <>06:00:00</>
                )}
              </div>

              <div className="whitespace-nowrap">Dispatched Buses:</div>
            <div className="text-center">{dispatchedBuses.length}</div>

            <div className="whitespace-nowrap pb-3">Buses on road:</div>
            <div className="text-center pb-3">{operationBuses.length}</div>
          </div>
        </>
      )}

        <div className="border-t border-gray-400 w-full pt-2">
          <BusStatistics />
        </div>
        </>
      )}
    </div>
  );
}

