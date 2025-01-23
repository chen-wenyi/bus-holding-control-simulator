'use client';
import { useSimStore } from '@/store/useSimStore';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Button } from './ui/button';

const Speedup = () => {
  const setTimerMultiplier = useSimStore((state) => state.setTimerMultiplier);
  const { multiplier, status } = useSimStore((state) => state.timer);

  const onMultiplierChanged = useCallback(
    debounce((value: number) => {
      setTimerMultiplier(value);
    }, 200),
    [setTimerMultiplier]
  );

  return (
    <div className='flex my-4 justify-center items-center gap-2'>
      <Button
        size='sm'
        variant={multiplier === 1 ? 'default' : 'outline'}
        onClick={() => onMultiplierChanged(1)}
        disabled={status !== 'idle'}
      >
        x 1
      </Button>
      <Button
        size='sm'
        variant={multiplier === 10 ? 'default' : 'outline'}
        onClick={() => onMultiplierChanged(10)}
        disabled={status !== 'idle'}
      >
        x 10
      </Button>
      <Button
        size='sm'
        variant={multiplier === 50 ? 'default' : 'outline'}
        onClick={() => onMultiplierChanged(50)}
        disabled={status !== 'idle'}
      >
        x 50
      </Button>
      <Button
        size='sm'
        variant={multiplier === 100 ? 'default' : 'outline'}
        onClick={() => onMultiplierChanged(100)}
        disabled={status !== 'idle'}
      >
        x 100
      </Button>
    </div>
  );
};

export default Speedup;
