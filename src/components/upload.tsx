import { uploadAction } from '@/actions';
import Form from 'next/form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import UploadForm from './uploadForm';

export default function Upload() {
  return (
    <Dialog>
      <DialogTrigger className='w-[85%]'>
        <Button className='w-full' variant='outline' asChild>
          <div>Upload Model Output</div>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Upload Model Output</DialogTitle>
          <DialogDescription>
            Upload .zip file contains csv output
          </DialogDescription>
        </DialogHeader>
        <Form action={uploadAction}>
          <UploadForm />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
