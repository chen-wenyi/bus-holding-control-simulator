'use client';
import { ListBlobResultBlob } from '@vercel/blob';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadForm() {
  const { pending } = useFormStatus();
  const [policies, setPolicies] = useState<ListBlobResultBlob[]>([]);
  useEffect(() => {
    if (pending === false) {
      axios
        .get<ListBlobResultBlob[]>('/api/policies')
        .then(({ data }) => setPolicies(data));
    }
  }, [pending]);

  const onPolicyClicked = (p: string) => {
    axios.get('/api/policy', { params: { policy: p} })
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        <Input type='file' accept='.zip' name='file' required />
        <Button type='submit' className='m-4' disabled={pending}>
          upload
        </Button>
      </div>

      <div>
        <div className='p-4'>Policies</div>
        {policies.map((p) => (
          <div key={p.pathname}>
            <Button variant='ghost' onClick={() => onPolicyClicked(p.pathname)}>
              <span className='text-xs'>{p.pathname.replace('policies/', '')}</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
