import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import SelectOutput from './selectOutput';
import Upload from './upload';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='flex items-center'>
        <div className='text-base font-semibold text-center p-4'>
          Bus Holding Control Simulator
        </div>
        <Upload />
        <SelectOutput />
      </SidebarContent>
    </Sidebar>
  );
}
