'use client';

import { delOutputs } from '@/app/actions';
import { useSimStore } from '@/store/useSimStore';
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
import PassengerConfig from './passengerConfig';
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
  const setSelectedOutput = useSimStore((state) => state.setSelectedOutput);
  const selectedOutput = useSimStore((state) => state.selectedOutput);

  const [open, setOpen] = useState(false);
  const [outputs, setOutputs] = useState<ListBlobResultBlob[]>([]);
  const [optimisedOutputs, updateOptimisedOutputs] = useOptimistic(
    outputs,
    (state, url: string) => state.filter((o) => o.url !== url)
  );
  const [isPending, startPendingTransition] = useTransition();

  const displayedOutput = selectedOutput?.name || 'Select Model Output';

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      startPendingTransition(async () => {
        const { data } = await axios.get<ListBlobResultBlob[]>('/api/outputs');
        setOutputs(data);
      });
    }
  };

  const onOutputClicked = async (blob: ListBlobResultBlob) => {
    const { data } = await axios.get<OutputDict>('/api/outputs', {
      params: { outputUrl: blob.downloadUrl },
    });
    setSelectedOutput(blob.pathname.replace('outputs/', ''), data);
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

      <div className='flex flex-col w-full my-2 space-y-2 pl-3'>
        {[
          {
            icon: <Bus className='w-6 h-6 text-[#334155]' />,
            label: 'Trips:',
            value: selectedOutput?.busNum || '0',
          },
          {
            icon: <Waypoints className='w-6 h-6 text-[#334155]' />,
            label: 'Stops:',
            value: selectedOutput?.stopNum || '0',
          },
        ].map(({ icon, label, value }, index) => (
          <div key={index} className='flex items-center w-full h-6'>
            <div className='w-[22%] flex justify-center'>{icon}</div>
            <div className='w-[25%] text-left text-[14px]'>{label}</div>
            <div className='w-[28%] text-right'>{value}</div>
          </div>
        ))}

        <PassengerConfig />
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
