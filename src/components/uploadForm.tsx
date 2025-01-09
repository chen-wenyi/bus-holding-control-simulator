'use client';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadForm({
  onUploadedAction,
}: {
  onUploadedAction: () => void;
}) {
  const { pending } = useFormStatus();
  const prevPending = useRef(pending);

  useEffect(() => {
    if (prevPending.current && !pending) {
      onUploadedAction();
    }
    prevPending.current = pending;
  }, [pending]);

  return (
    <>
      <div className='flex justify-center items-center'>
        <Input type='file' accept='.zip' name='file' required />
        <Button type='submit' className=' mx-4' disabled={pending}>
          <div className='flex justify-center items-center w-14'>
            {pending ? (
              <LoaderCircle className='animate-spin duration-1000' />
            ) : (
              'upload'
            )}
          </div>
        </Button>
      </div>
    </>
  );
}
