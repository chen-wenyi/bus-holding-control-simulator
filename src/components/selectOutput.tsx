'use client';

import { delOutputs } from '@/app/actions';
import { OutputDict } from '@/types';
import { ListBlobResultBlob } from '@vercel/blob';
import axios from 'axios';
import { Bus, LoaderCircle, Waypoints } from 'lucide-react';
import {
  MouseEvent,
  startTransition,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { MdDelete, MdDeleteForever } from 'react-icons/md';
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
  const [optimisedOutputs, updateOptimisedOutputs] = useOptimistic(
    outputs,
    (state, url: string) => state.filter((o) => o.url !== url)
  );

  const [isPending, startPendingTransition] = useTransition();
  const [currOutputName, setCurrOutputName] = useState('');
  const [currOutput, setCurrOutput] = useState<OutputDict>();

  const busNum = currOutput ? Object.entries(currOutput).length : '-';
  const stopNum = currOutput ? currOutput[0].length + 1 : '-';

  const displayedOutput = currOutputName || 'Select Model Output';

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      startPendingTransition(async () => {
        const { data } = await axios.get<ListBlobResultBlob[]>('/api/outputs');
        startPendingTransition(() => setOutputs(data));
      });
    }
  };

  const onOutputClicked = async (blob: ListBlobResultBlob) => {
    const { data } = await axios.get<OutputDict>('/api/outputs', {
      params: { outputUrl: blob.downloadUrl },
    });
    setCurrOutput(data);
    setCurrOutputName(blob.pathname.replace('outputs/', ''));
    setOpen(false);
  };

  const onOutputDelete = async (url: string) => {
    startTransition(async () => {
      updateOptimisedOutputs(url);
      await delOutputs(url);
      startTransition(async () => {
        const { data } = await axios.get<ListBlobResultBlob[]>('/api/outputs');
        setOutputs(data);
      });
    });
  };

  return (
    <div className='flex flex-col justify-center items-center w-[85%]'>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className='w-full'>
          <Button className='w-full' variant='outline' asChild>
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
              optimisedOutputs
                .filter((output) => output.pathname.includes('outputs'))
                .map((o, idx) => (
                  <div className='flex' key={o.pathname + idx}>
                    <Button variant='ghost' onClick={() => onOutputClicked(o)}>
                      <span className='text-xs'>
                        {o.pathname.replace('outputs/', '')}
                      </span>
                      <Delete onDelete={() => onOutputDelete(o.url)} />
                    </Button>
                    <hr />
                  </div>
                ))
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex flex-col items-center justify-around w-full my-2'>
        <div className='flex gap-2'>
          <Bus />Buses:
          <div>{busNum}</div>
        </div>
        <div className='flex gap-2'>
          <Waypoints />Stops:
          <div>{stopNum}</div>
        </div>
      </div>
    </div>
  );
}

const Delete = ({ onDelete }: { onDelete: () => void }) => {
  const [onDeleteHover, setOnDeleteHover] = useState(false);
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDelete();
  };
  return (
    <div
      onMouseOver={() => setOnDeleteHover(true)}
      onMouseLeave={() => setOnDeleteHover(false)}
      onClick={onClick}
    >
      {onDeleteHover ? <MdDeleteForever /> : <MdDelete />}
    </div>
  );
};
