'use client';

import { useSimStore } from '@/store/useSimStore';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

const DebugButton = () => {
  const isDebug = useSimStore((state) => state.debuge);
  const toggleDebug = useSimStore((state) => state.toggleDebug);
  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='debug-mode'
        checked={isDebug}
        onClick={toggleDebug}
        className="data-[state=checked]:bg-[#2E5F73] data-[state=checked]:border-[#2E5F73] transition-colors duration-300"
      />
      <Label htmlFor='debug-mode'>Debug Mode</Label>
    </div>
  );
};

export default DebugButton;
