'use client';

import { useSimStore } from '@/store/useSimStore';
import { Users } from 'lucide-react';
import { Input } from './ui/input';

const PassengerConfig = () => {
  const value = useSimStore((store) => store.busOperation.passengerCapacity);
  const setPassengerCapacity = useSimStore(
    (store) => store.setPassengerCapacity
  );

  const onChange = (value: string) => {
    const numberVal = Number(value);
    if (!isNaN(numberVal)) {
      setPassengerCapacity(numberVal);
    }
  };

  return (
    <div className="flex items-center w-full pl-3 h-6 text-[#334155]">
      <div className="w-[17%] flex justify-left">
        <Users className="w-6 h-6" />
      </div>
      <div className="w-[30%] text-left text-[14px]">Capacity:</div>
      <div className="w-[48%] text-right ml-auto">
        <Input className="w-16 px-2 py-1 text-center border rounded" value={value} onChange={({ target }) => onChange(target.value)} />
      </div>
    </div>

  );
};

export default PassengerConfig;
