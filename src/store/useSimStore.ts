import { OutputDict, PorcessedPolicyOutputData } from '@/types';
import { create } from 'zustand';

type SimStoreState = {
  selectedOutput: {
    name: string;
    value: OutputDict;
    busTimeTable: number[];
    buses: PorcessedPolicyOutputData[][];
    busNum: number;
    stopNum: number;
  } | null;
  timer: {
    multiplier: number;
    nextBusIndex: number;
  };
  busOperation: {
    buses: PorcessedPolicyOutputData[][];
  };
};

type SimStoreActions = {
  setSelectedOutput: (
    selectedOutput: NonNullable<SimStoreState['selectedOutput']>
  ) => void;
  startSimulate: () => void;
  setTimerMultiplier: (multiplier: number) => void;
  updatenextBusIndex: () => void;
};

type SimStore = SimStoreState & SimStoreActions;

export const useSimStore = create<SimStore>()((set, get) => ({
  selectedOutput: null,
  timer: { multiplier: 1, timetable: [], nextBusIndex: -1 },
  busOperation: { buses: [] },
  setSelectedOutput: (selectedOutput) => set({ selectedOutput }),
  startSimulate: () =>
    set({
      busOperation: { buses: [get().selectedOutput!.buses[0]] },
      timer: {
        ...get().timer,
        nextBusIndex: 1,
      },
    }),
  setTimerMultiplier: (multiplier) =>
    set({ timer: { ...get().timer, multiplier } }),
  updatenextBusIndex: () => {
    if (get().timer.nextBusIndex < get().selectedOutput!.busNum - 1) {
      const currBusIndex = get().timer.nextBusIndex;
      const dispatchBus = get().selectedOutput!.buses[currBusIndex];
      const nextBusIndex = currBusIndex + 1;
      const buses = get().busOperation.buses;
      set({
        busOperation: { buses: [...buses, dispatchBus] },
        timer: {
          ...get().timer,
          nextBusIndex,
        },
      });
    } else {
      set({
        timer: { ...get().timer, nextBusIndex: -1 },
      });
    }
  },
}));
