'use client';

import useTimer from '@/hooks/useTimer';
import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { RiSpeedFill } from 'react-icons/ri';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export default function TimePanel() {
  const busTimeTable = useSimStore(
    (state) => state.selectedOutput?.busTimeTable
  );
  const startSimulate = useSimStore((state) => state.startSimulate);
  const timer = useSimStore((state) => state.timer);
  const updateNextBusIndex = useSimStore((state) => state.updateNextBusIndex);
  const operationBuses = useSimStore((state) => state.busOperation.busesOnRoad);
  const dispatchedBuses = useSimStore(
    (state) => state.busOperation.dispatchedBuses
  );
  const setTimerMultiplier = useSimStore((state) => state.setTimerMultiplier);

  const { nextBusIndex, multiplier } = timer;
  const nextBusTime =
    nextBusIndex !== -1 ? busTimeTable?.[nextBusIndex] : undefined;

  const nextBusDetailedTime = nextBusTime
    ? getDetailedTime(nextBusTime)
    : undefined;

  const outputName = useSimStore((state) => state.selectedOutput?.name);
  const [isStarted, setStarted] = useState(false);
  const timeElapse = useTimer(isStarted, multiplier);

  const onClick = () => {
    startSimulate();
    setStarted(true);
  };

  const onMultiplierChanged = useCallback(
    debounce((value: [number]) => {
      const [newMultiplier] = value;
      setTimerMultiplier(newMultiplier);
    }, 200),
    [setTimerMultiplier]
  );

  useEffect(() => {
    if (
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
          <Button onClick={onClick} disabled={isStarted}>
            Start Simulate
          </Button>
          {timeElapse && (
            <>
              <div className='flex items-center justify-center text-xl my-2'>
                <div>{formatTime(timeElapse.hours)}:</div>
                <div>{formatTime(timeElapse.minutes)}:</div>
                <div>{formatTime(timeElapse.seconds)}</div>
              </div>
              <div className='flex mb-2 justify-center items-center gap-4'>
                <RiSpeedFill />
                <div className='flex-1'>
                  <Slider
                    defaultValue={[multiplier]}
                    max={1000}
                    min={1}
                    onValueChange={onMultiplierChanged}
                    step={1}
                  />
                </div>
                <div className='text-sm font-bold'>
                  {multiplier}
                  <span className='text-xs'>x</span>
                </div>
              </div>

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
