import { uploadAction } from '@/actions';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import Form from 'next/form';
import UploadForm from './UploadForm';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className='text-base font-semibold text-center p-4'>
          Bus Holding Control Simulator
        </div>
        <Form action={uploadAction}>
          <UploadForm />
        </Form>
      </SidebarContent>
    </Sidebar>
  );
}
