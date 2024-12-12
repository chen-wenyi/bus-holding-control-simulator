'use client';

import { OutputDict } from '@/types';
import { ListBlobResultBlob } from '@vercel/blob';
import axios from 'axios';
import { Bus, LoaderCircle, Waypoints } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function SelectOutput() {
  const [open, setOpen] = useState(false);

  const [outputs, setOutputs] = useState<ListBlobResultBlob[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currOutputName, setCurrOutputName] = useState('');
  const [currOutput, setCurrOutput] = useState<OutputDict>();

  const busNum = currOutput ? Object.entries(currOutput).length : '-';
  const stopNum = currOutput ? currOutput[0].length + 1 : '-';

  const displayedOutput = currOutputName || 'Select Model Output';

  useEffect(() => {
    startTransition(async () => {
      const { data } = await axios.get<ListBlobResultBlob[]>('/api/outputs');
      setOutputs(data);
    });
  }, []);

  const onOutputClicked = async (blob: ListBlobResultBlob) => {
    const { data } = await axios.get<OutputDict>('/api/output', {
      params: { outputUrl: blob.downloadUrl },
    });
    setCurrOutput(data);
    setCurrOutputName(blob.pathname.replace('policies/', ''));
    setOpen(false);
  };

  return (
    <div className='flex flex-col justify-center items-center w-[85%]'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='w-full'>
          <Button className='w-full' variant='outline'>
            <div title={displayedOutput} className='truncate'>
              {displayedOutput}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Select Model Output</DialogTitle>
            <DialogDescription>Select an output to simulate</DialogDescription>
          </DialogHeader>
          <div>
            {isPending ? (
              <LoaderCircle className='animate-spin duration-1000 ml-4' />
            ) : (
              outputs.map((o) => (
                <div className='flex' key={o.pathname}>
                  <Button variant='ghost' onClick={() => onOutputClicked(o)}>
                    <span className='text-xs'>
                      {o.pathname.replace('policies/', '')}
                    </span>
                  </Button>
                  <hr />
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex justify-around w-full my-2'>
        <div className='flex gap-2'>
          <Bus />
          <div>{busNum}</div>
        </div>
        <div className='flex gap-2'>
          <Waypoints />
          <div>{stopNum}</div>
        </div>
      </div>
    </div>
  );
}
