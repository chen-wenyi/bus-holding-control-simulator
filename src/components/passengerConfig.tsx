'use client';

import { useSimStore } from '@/store/useSimStore';
import { MdOutlineEmojiPeople } from 'react-icons/md';
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
    <div className='flex justify-center items-center pl-12'>
      <div className='flex flex-1'>
        <MdOutlineEmojiPeople size={22} />
        <div>Capacity</div>
      </div>
      <div className='flex w-14 mx-2'>
        <Input
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
      </div>
    </div>
  );
};

export default PassengerConfig;
