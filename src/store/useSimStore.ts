import { OutputDict, PorcessedPolicyOutputData } from '@/types';
import { create } from 'zustand';

type SimStoreState = {
  debuge: boolean;
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
    passengerCapacity: number;
    dispatchedBuses: { value: PorcessedPolicyOutputData[]; id: number }[];
    busesOnRoad: { value: PorcessedPolicyOutputData[]; id: number }[];
  };
};

type SimStoreActions = {
  toggleDebug: () => void;
  setSelectedOutput: (
    selectedOutput: NonNullable<SimStoreState['selectedOutput']>
  ) => void;
  startSimulate: () => void;
  setTimerMultiplier: (multiplier: number) => void;
  updateNextBusIndex: () => void;
  removeOnRoadBus: (id: number) => void;
  setPassengerCapacity: (value: number) => void;
};

type SimStore = SimStoreState & SimStoreActions;

export const useSimStore = create<SimStore>()((set, get) => ({
  debuge: false,
  selectedOutput: null,
  timer: { multiplier: 50, timetable: [], nextBusIndex: -1 },
  busOperation: {
    passengerCapacity: 100,
    busesOnRoad: [],
    dispatchedBuses: [],
  },
  toggleDebug: () => set({ debuge: !get().debuge }),
  setSelectedOutput: (selectedOutput) => set({ selectedOutput }),
  startSimulate: () => {
    const id = get().selectedOutput!.busTimeTable[0];
    const onRoadBus = [{ id, value: get().selectedOutput!.buses[0] }];
    set({
      busOperation: {
        ...get().busOperation,
        busesOnRoad: onRoadBus,
        dispatchedBuses: onRoadBus,
      },
      timer: {
        ...get().timer,
        nextBusIndex: 1,
      },
    });
  },
  setTimerMultiplier: (multiplier) =>
    set({ timer: { ...get().timer, multiplier } }),
  updateNextBusIndex: () => {
    if (get().timer.nextBusIndex < get().selectedOutput!.busNum - 1) {
      const currBusIndex = get().timer.nextBusIndex;
      const dispatchBus = get().selectedOutput!.buses[currBusIndex];
      const id = get().selectedOutput!.busTimeTable[currBusIndex];
      const nextBusIndex = currBusIndex + 1;
      const busesOnRoad = get().busOperation.busesOnRoad;
      set({
        busOperation: {
          ...get().busOperation,
          busesOnRoad: [...busesOnRoad, { id, value: dispatchBus }],
          dispatchedBuses: [...busesOnRoad, { id, value: dispatchBus }],
        },
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
  removeOnRoadBus: (id) => {
    set({
      busOperation: {
        ...get().busOperation,
        busesOnRoad: get().busOperation.busesOnRoad.filter((b) => b.id !== id),
      },
    });
  },
  setPassengerCapacity: (value) => {
    set({
      busOperation: {
        ...get().busOperation,
        passengerCapacity: value,
      },
    });
  },
}));
