import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import DebugButton from './debugButton';
import InformationPanel from './informationPanel';
import SelectOutput from './selectOutput';
import Upload from './upload';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='flex items-center'>
      <div className="text-lg font-bold text-[#1E293B] tracking-wide text-center py-3">
      Bus Holding Control Simulator
        </div>
        <DebugButton />
        <Upload />
        <SelectOutput />
        <InformationPanel />
      </SidebarContent>
    </Sidebar>
  );
}
