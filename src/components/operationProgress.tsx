import { formatTime, getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';

const OperationProgress = ({ elapse }: { elapse: number }) => {
  const totalOperationTime = useSimStore((state) => state.selectedOutput?.totalOperationTime);
  const busTimeTable = useSimStore((state) => state.selectedOutput?.busTimeTable);
  const earliestTime = busTimeTable && busTimeTable.length > 0 ? Math.min(...busTimeTable) : 21600;

  const currentTime = earliestTime + elapse;
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
        defaultValue={[earliestTime]}
        max={totalOperationTime ? earliestTime + totalOperationTime : earliestTime + 3600}
        min={earliestTime}
        value={[currentTime]}
        step={1}
      />
    </div>
  );
};

export default OperationProgress;
