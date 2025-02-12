import { SimStoreState, useSimStore } from '@/store/useSimStore';
import Image from 'next/image';

export default function ViewControls() {
  const { pos } = useSimStore((state) => state.view);
  const setView = useSimStore((state) => state.setView);

  const onClick = (view?: SimStoreState['view']['pos']) => {
    if (view === 'topView') {
      setView({ pos: 'topView' });
    } else {
      setView({
        pos: pos === 'rotatedSouth' ? 'rotatedNorth' : 'rotatedSouth',
      });
    }
  };

  return (
    <div className='flex flex-row justify-center items-center absolute z-10 top-[5%] left-[58%] -translate-x-1/2 bg-white/80 p-2 rounded-lg shadow-md'>
      {/* Top View Button */}
      <button
        onClick={() => onClick('topView')}
        className='flex items-center justify-center mx-[5px] p-[6px] rounded-lg border-none cursor-pointer bg-[rgb(73,104,118)] hover:bg-[rgb(45,75,90)] text-white flex-1 max-w-[170px] min-w-[170px] text-center transition-all outline-none shadow-none'
      >
        <Image
          src='/assets/down_circle.svg'
          width={18}
          height={18}
          className='mr-[7px]'
          alt='Top View Icon'
        />
        Top View
      </button>

      {/* Rotated View Button */}
      <button
        onClick={() => onClick()}
        className='flex items-center justify-center mx-[5px] p-[6px] rounded-lg border-none cursor-pointer bg-[rgb(73,104,118)] hover:bg-[rgb(45,75,90)] text-white flex-1 max-w-[170px] min-w-[170px] text-center transition-all outline-none shadow-none'
      >
        <Image
          src='/assets/up_circle.svg'
          width={18}
          height={18}
          className='mr-[7px]'
          alt='Rotated View Icon'
        />
        Rotated View
      </button>
    </div>
  );
}
