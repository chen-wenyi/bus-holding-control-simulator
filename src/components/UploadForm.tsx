'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadForm() {
  const { pending } = useFormStatus();
  const [policies, setPolicies] = useState<string[]>([]);
  useEffect(() => {
    if (pending === false) {
      axios
        .get<string[]>('/api/policies')
        .then(({ data }) => setPolicies(data));
    }
  }, [pending]);

  const onPolicyClicked = (p: string) => {
    axios.get('/api/policy', { params: { policy: p} })
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        <Input type='file' name='file' required />
        <Button type='submit' className='m-4' disabled={pending}>
          upload
        </Button>
      </div>

      <div>
        <div className='p-4'>Policies</div>
        {policies.map((p) => (
          <div key={p}>
            <Button variant='ghost' onClick={() => onPolicyClicked(p)}>
              <span className='text-xs'>{p}</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
