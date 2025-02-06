import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';

const OperationProgress = ({ elapse }: { elapse: number }) => {
  const totalOperationTime = useSimStore((state) => state.selectedOutput?.totalOperationTime);
  const { offset } = useSimStore((state) => state.busOperation);

  const currentTime = elapse;

  const timeElapse = getDetailedTime(currentTime);

  return (
    <div>
      <div>
        <div className='flex items-center justify-center text-xl my-2'>
          <div className='w-[20%]'>
            <Clock className='mx-2' />
          </div>
          <div className="flex items-center justify-center text-xl font-semibold">
            <span>{formatTime(timeElapse.hours)}:</span>
            <span>{formatTime(timeElapse.minutes)}:</span>
            <span>{formatTime(timeElapse.seconds)}</span>
          </div>
        </div>
      </div>
      <Slider
        defaultValue={[offset]}
        max={totalOperationTime ? offset + totalOperationTime : offset + 3600}
        min={offset}
        value={[currentTime]}
        step={1}
      />
    </div>
  );
};

export default OperationProgress;