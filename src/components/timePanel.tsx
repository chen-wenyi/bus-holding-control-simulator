'use client';

import useTimer from '@/hooks/useTimer';
import { useState } from 'react';
import { Button } from './ui/button';

export default function TimePanel() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>();
  const timeElapse = useTimer(currentTimestamp, 1);

  const onClick = () => {
    setCurrentTimestamp(Date.now());
  };

  return (
    <div className='flex flex-col p-4 w-full'>
      {/* <div>{timeElapse.days} days</div> */}
      <Button onClick={onClick}>Start Simulate</Button>
      {timeElapse && (
        <div className='flex items-center justify-center text-xl'>
          <div>{String(timeElapse.hours).padStart(2, '0')}:</div>
          <div>{String(timeElapse.minutes).padStart(2, '0')}:</div>
          <div>{String(timeElapse.seconds).padStart(2, '0')}</div>
        </div>
      )}
    </div>
  );
}
