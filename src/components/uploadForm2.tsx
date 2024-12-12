'use client';
import { RefreshCcw } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadForm() {
  const { pending } = useFormStatus();
 
  return (
    <>
      <div className='flex justify-center items-center'>
        <Input type='file' accept='.zip' name='file' required />
        <Button type='submit' className='m-4' disabled={pending}>
          {pending ? (
            <RefreshCcw className='animate-spin duration-1000' />
          ) : (
            <span>upload</span>
          )}
        </Button>
      </div>
    </>
  );
}
