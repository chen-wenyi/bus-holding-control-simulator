import { OutputDict, ProcessedPolicyOutputData, TimerStatus } from '@/types';
import { create } from 'zustand';

export type SimStoreState = {
  debuge: boolean;
  view: { pos: 'topView' | 'rotatedSouth' | 'rotatedNorth' };
  selectedOutput: {
    name: string;
    value: OutputDict;
    busTimeTable: number[];
    totalOperationTime: number;
    buses: ProcessedPolicyOutputData[][];
    busNum: number;
    stopNum: number;
  } | null;
  timer: {
    status: TimerStatus;
    multiplier: number;
    nextBusIndex: number;
  };
  busOperation: {
    offset: number;
    operationTime: number;
    breakpoint: number;
    passengerCapacity: number;
    dispatchedBuses: { value: ProcessedPolicyOutputData[]; id: number }[];
    busesOnRoad: { value: ProcessedPolicyOutputData[]; id: number }[];
  };
  busStatistics: {
    totalWaitingTime: number;
    totalTravelTime: number;
    totalHoldingTime: number;
    totalPassengers: number;
    totalBusesOperated: number;
    totalBunching: number;
  };
};

type SimStoreActions = {
  toggleDebug: () => void;
  setView: (view: SimStoreState['view']) => void;
  setSelectedOutput: (name: string, outputVal: NonNullable<OutputDict>) => void;
  startSimulation: () => void;
  resetSimulation: () => void;
  pauseSimulation: () => void;
  setTimerStatus: (status: TimerStatus) => void;
  setOperationTime: (second: number) => void;
  setTimerMultiplier: (multiplier: number) => void;
  updateNextBusIndex: () => void;
  removeOnRoadBus: (id: number) => void;
  setPassengerCapacity: (value: number) => void;
};

type SimStore = SimStoreState & SimStoreActions;

const defaultState: SimStoreState = {
  debuge: true,
  view: { pos: 'rotatedSouth' },
  selectedOutput: null,
  timer: { status: 'idle', multiplier: 50, nextBusIndex: -1 },
  busOperation: {
    offset: 6 * 3600, // second
    breakpoint: 0,
    passengerCapacity: 100,
    operationTime: 0, // second
    busesOnRoad: [],
    dispatchedBuses: [],
  },
  busStatistics: {
    totalWaitingTime: 0,
    totalTravelTime: 0,
    totalHoldingTime: 0,
    totalPassengers: 0,
    totalBusesOperated: 0,
    totalBunching: 0,
  },
};

export const useSimStore = create<SimStore>()((set, get) => ({
  ...defaultState,

  toggleDebug: () => set({ debuge: !get().debuge }),
  setView: (view) => set({ view }),
  setSelectedOutput: (name, outputVal) => {
    const busTimeTable = Object.keys(outputVal).map(Number);
    const buses = Object.values(outputVal);
    const busNum = Object.entries(outputVal).length;
    const stopNum = outputVal[0].length + 1;
    const totalOperationTime =
      busTimeTable[busTimeTable.length - 1] +
      buses[buses.length - 1].reduce((accumulator, { dwell, duration }) => {
        return accumulator + dwell + duration;
      }, 0);
    set({
      selectedOutput: {
        name,
        busTimeTable,
        buses,
        busNum,
        stopNum,
        totalOperationTime,
        value: outputVal,
      },
    });
  },
  startSimulation: () => {
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
        status: 'started',
        nextBusIndex: 1,
      },
    });
  },
  resetSimulation: () => {
    set({
      timer: { status: 'idle', multiplier: 50, nextBusIndex: -1 },
      busOperation: defaultState.busOperation,
    });
  },
  pauseSimulation: () => {
    const operationTime = get().busOperation.operationTime;
    const breakpoint = get().busOperation.breakpoint + operationTime;
    set({
      timer: {
        ...get().timer,
        status: 'paused',
      },
      busOperation: { ...get().busOperation, operationTime: 0, breakpoint },
    });
  },
  setTimerStatus: (status) => set({ timer: { ...get().timer, status } }),
  setOperationTime: (second) => {
    set({
      busOperation: {
        ...get().busOperation,
        operationTime: second,
      },
    });
  },
  setTimerMultiplier: (multiplier) =>
    set({ timer: { ...get().timer, multiplier } }),
  updateNextBusIndex: () => {
    const currBusIndex = get().timer.nextBusIndex;
    const dispatchBus = get().selectedOutput!.buses[currBusIndex];
    const busesOnRoad = get().busOperation.busesOnRoad;
    const dispatchedBuses = get().busOperation.dispatchedBuses;
    const id = get().selectedOutput!.busTimeTable[currBusIndex];

    if (get().timer.nextBusIndex < get().selectedOutput!.busNum - 1) {
      const nextBusIndex = currBusIndex + 1;
      set({
        busOperation: {
          ...get().busOperation,
          busesOnRoad: [...busesOnRoad, { id, value: dispatchBus }],
          dispatchedBuses: [...dispatchedBuses, { id, value: dispatchBus }],
        },
        timer: {
          ...get().timer,
          nextBusIndex,
        },
      });
    } else {
      set({
        timer: { ...get().timer, nextBusIndex: -1 },
        busOperation: {
          ...get().busOperation,
          busesOnRoad: [...busesOnRoad, { id, value: dispatchBus }],
          dispatchedBuses: [...dispatchedBuses, { id, value: dispatchBus }],
        },
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
