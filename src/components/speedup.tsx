'use client';
import { useSimStore } from '@/store/useSimStore';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Button } from './ui/button';
import { FastForward } from 'lucide-react';

const Speedup = () => {
  const setTimerMultiplier = useSimStore((state) => state.setTimerMultiplier);
  const { multiplier, status } = useSimStore((state) => state.timer);

  const onMultiplierChanged = useCallback(
    (value: number) => {
      setTimerMultiplier(value);
    },
    [setTimerMultiplier]
  );

  return (

    <div className='flex my-3 justify-center items-center gap-1.5'>
      {[1, 10, 50, 100].map((value) => (
        <Button
          key={value}
          size='sm'
          className={`h-11 w-11 rounded-full flex items-center justify-center ${
            multiplier === value
              ? 'bg-[#2A3D54] text-white hover:bg-[#1B2C3F]'
              : 'bg-white text-[#2A3D54] border border-[#2A3D54] hover:bg-[#2A3D54] hover:text-white'
          } ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onMultiplierChanged(value)}
          disabled={status !== 'idle'}
        >
          {value}x
        </Button>
      ))}
    </div>

    // <div className='flex my-4 justify-center items-center gap-2' style={{borderRadius: '100px'}}>
    //   {[1, 10, 50, 100].map((value) => (
    //     <Button
    //       key={value}
    //       size='sm'
    //       className={`w-16 transition-all duration-200 ${
    //         multiplier === value
    //           ? 'bg-[#2A3D54] text-white hover:bg-[#1B2C3F]'
    //           : 'bg-white text-[#2A3D54] border border-[#2A3D54] hover:bg-[#2A3D54] hover:text-white'
    //       } ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
    //       onClick={() => onMultiplierChanged(value)}
    //       disabled={status !== 'idle'}
    //     >
    //       x {value}
    //     </Button>
    //   ))}
    // </div>

  );
};

export default Speedup;
