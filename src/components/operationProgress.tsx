'use client';

import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';

const OperationProgress = ({ elapse }: { elapse: number }) => {
  const totalOperationTime = useSimStore(
    (state) => state.selectedOutput?.totalOperationTime
  );

  const timeElapse = getDetailedTime(elapse);

  return (
    <div>
      <div>
        <div className='flex items-center justify-center text-xl my-2'>
          <div className='w-[20%]'>
            <Clock className='mx-2' />
          </div>
          <div className='flex items-center justify-start text-xl'>
            <div>{formatTime(timeElapse.hours)}:</div>
            <div>{formatTime(timeElapse.minutes)}:</div>
            <div>{formatTime(timeElapse.seconds)}</div>
          </div>
        </div>
      </div>
      <Slider
        defaultValue={[0]}
        max={totalOperationTime}
        min={0}
        value={[elapse]}
        // onValueChange={totalOperationTime || 0}
        step={1}
      />
    </div>
  );
};

export default OperationProgress;
