import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import DebugButton from './debugButton';
import InformationPanel from './informationPanel';
import SelectOutput from './selectOutput';
import Upload from './upload';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='flex items-center'>
        <div className='text-base font-semibold text-center p-4'>
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
