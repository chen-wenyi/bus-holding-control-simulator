'use client';

import { getDetailedTime } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';

const BusStatistics = () => {
  const busStatistics = useSimStore((state) => state.busStatistics);

  const totalServiceTime = getDetailedTime(busStatistics.totalOperationTime);
  const avgWaitingTime = getDetailedTime(busStatistics.avgWaitingTime);
  const avgBusTravelTime = getDetailedTime(busStatistics.avgBusTravelTime);
  const avgDwellingTime = getDetailedTime(busStatistics.avgDwellingTime);

  return (
    <div className='text-sm'>
      <div className='grid grid-cols-[1.5fr_1fr] gap-1'>
        <div className='whitespace-nowrap'>Avg Waiting Time:</div>
        <div className='text-left'>
          {avgWaitingTime.minutes}m {avgWaitingTime.seconds}s
        </div>

        <div className='whitespace-nowrap'>Avg Bus Travel Time:</div>
        <div className='text-left'>
          {avgBusTravelTime.hours}h {avgBusTravelTime.minutes}m{' '}
          {avgBusTravelTime.seconds}s
        </div>

        <div className='whitespace-nowrap'>Avg Dwelling Time:</div>
        <div className='text-left'>
          {avgDwellingTime.minutes}m {avgDwellingTime.seconds}s
        </div>

        <div className='whitespace-nowrap'>Avg Bus Occupancy:</div>
        <div className='text-left'>
          {(busStatistics.avgOccupancy * 100).toFixed(2)}%
        </div>

        <div className='whitespace-nowrap'>Total Service Time: </div>
        <div className='text-left'>
          {totalServiceTime.hours}h {totalServiceTime.minutes}m{' '}
          {totalServiceTime.seconds}s
        </div>
      </div>

      <div>
        <div className='whitespace-nowrap pt-1'>
          Total Number of Bunching:
          {busStatistics.totalBunching}
        </div>
      </div>
    </div>
  );
};

export default BusStatistics;
