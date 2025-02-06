import { OutputDict, ProcessedPolicyOutputData, TimerStatus } from '@/types';
import { create } from 'zustand';

type SimStoreState = {
  debuge: boolean;
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

  setSelectedOutput: (name, outputVal) => {
    const busTimeTable = Object.keys(outputVal).map(Number);
    const buses = Object.values(outputVal);
    const busNum = buses.length;
    const stopNum = buses[0].length + 1;
    const passengerCapacity = get().busOperation.passengerCapacity; 
  
    const totalOperationTime =
      busTimeTable[busTimeTable.length - 1] +
      buses[buses.length - 1].reduce((acc, { dwell, duration }) => acc + dwell + duration, 0);
  
    let totalWaitingTime = 0;
    let totalTravelTime = 0;
    let totalHoldingTime = 0;
    let totalDwellStops = 0;
    const totalStops = 0;
    let totalTrips = 0;
    let totalPassengers = 0;
    let totalBusesOperated = 0;
    let totalBunching = 0;  
    const lastDepartureTime: { [key: string]: number } = {};
    const idealInterval = totalOperationTime / totalBusesOperated;
    const lastBusArrivalTimes: { [stopId: string]: number } = {};
    
    const historicalIntervals: number[] = [];
buses.forEach((bus, busIndex) => {
  if (busIndex > 0) {
    const interval = busTimeTable[busIndex] - busTimeTable[busIndex - 1];
    historicalIntervals.push(interval);
  }
});
const avgInterval = historicalIntervals.length > 0
  ? historicalIntervals.reduce((sum, v) => sum + v, 0) / historicalIntervals.length
  : totalOperationTime / busNum;

const bunchingThreshold = Math.max(avgInterval * 0.5, 30);

buses.forEach((bus, busIndex) => {
  const busStartTime = busTimeTable[busIndex];
  let busEndTime = busStartTime;

  bus.forEach((stop, stopIndex) => {
    const stopId = `${stop.from}-${stop.to}`;
    const arrivalTime = busEndTime;
    busEndTime += stop.dwell + stop.duration;

    if (lastDepartureTime[stopId] !== undefined) {
      totalWaitingTime += Math.max(0, arrivalTime - lastDepartureTime[stopId]);
    }
    lastDepartureTime[stopId] = busEndTime;

    if (!lastBusArrivalTimes[stopId]) {
      lastBusArrivalTimes[stopId] = arrivalTime;
    } else {
      const timeGap = arrivalTime - lastBusArrivalTimes[stopId];
      if (timeGap < bunchingThreshold && stopIndex > 0) {
        totalBunching++;
        console.log(`Bunching detected! Stop: ${stopId}, Gap: ${timeGap}, Threshold: ${bunchingThreshold}`);
      }
      lastBusArrivalTimes[stopId] = arrivalTime;
    }

    totalHoldingTime += stop.dwell;
    totalDwellStops++;
    totalTrips++;
    totalPassengers += stop.occupancy[1] * passengerCapacity;
  });

  totalTravelTime += busEndTime - busStartTime;
  totalBusesOperated++;
});

  
    const averageWaitingTime = totalStops > 0 ? totalWaitingTime / totalStops : 0;
    const averageTravelTime = totalTrips > 0 ? totalTravelTime / totalTrips : 0;
    const averageHoldingTime = totalDwellStops > 0 ? totalHoldingTime / totalDwellStops : 0;
    const averageOccupancy = totalBusesOperated > 0 ? totalPassengers / totalBusesOperated : 0;
  
    set({
      selectedOutput: {
        name,
        busTimeTable,
        buses,
        busNum,
        stopNum,
        totalOperationTime: busTimeTable[busTimeTable.length - 1],
        value: outputVal,
      },
      busStatistics: {
        totalWaitingTime: totalTrips > 0 ? totalWaitingTime / totalTrips : 0,
        totalTravelTime: totalBusesOperated > 0 ? totalTravelTime / totalBusesOperated : 0,
        totalHoldingTime: totalDwellStops > 0 ? totalHoldingTime / totalDwellStops : 0,
        totalPassengers: totalBusesOperated > 0 ? totalPassengers / totalBusesOperated : 0,
        totalBusesOperated: busNum,
        totalBunching: 0,
      },
    });
  },
  

  setPassengerCapacity: (value) => {
    set((state) => {
      const updatedTotalPassengers = state.selectedOutput
        ? state.selectedOutput.buses.flat().reduce(
            (sum, stop) => sum + stop.occupancy[1] * value, 0)
        : 0;

      return {
        busOperation: {
          ...state.busOperation,
          passengerCapacity: value,
        },
        busStatistics: {
          ...state.busStatistics,
          totalPassengers: updatedTotalPassengers,
        },
      };
    });
  },

  startSimulation: () => {
    set((state) => {
      if (state.timer.status === 'idle') {
        return {
          timer: {
            ...state.timer,
            status: 'started',
            nextBusIndex: 0,
          },
          busOperation: {
            ...state.busOperation,
            operationTime: 0,
          },
        };
      }

      if (state.timer.status === 'paused') {
        return {
          timer: {
            ...state.timer,
            status: 'started',
          },
          busOperation: {
            ...state.busOperation,
            operationTime: 0,
          },
        };
      }

      return {};
    });
  },

  updateNextBusIndex: () => {
    set((state) => {
      const { busTimeTable, buses } = state.selectedOutput!;
      const currBusIndex = state.timer.nextBusIndex;
  
      if (currBusIndex === -1 || currBusIndex >= busTimeTable.length) {
        return { timer: { ...state.timer, nextBusIndex: -1 } };
      }
  
      const id = busTimeTable[currBusIndex];
      const dispatchedBus = buses[currBusIndex];
  
      return {
        busOperation: {
          ...state.busOperation,
          busesOnRoad: [...state.busOperation.busesOnRoad, { id, value: dispatchedBus }],
          dispatchedBuses: [...state.busOperation.dispatchedBuses, { id, value: dispatchedBus }],
        },
        timer: {
          ...state.timer,
          nextBusIndex: currBusIndex + 1,
        },
      };
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

  setTimerMultiplier: (multiplier) => set({ timer: { ...get().timer, multiplier } }),

  resetSimulation: () => {
    set({
      timer: { status: 'idle', multiplier: 50, nextBusIndex: -1 },
      busOperation: defaultState.busOperation,
    });
  },

  pauseSimulation: () => {
    set((state) => {
      const currentTime = state.busOperation.breakpoint + state.busOperation.operationTime;
      return {
        timer: {
          ...state.timer,
          status: 'paused',
        },
        busOperation: {
          ...state.busOperation,
          breakpoint: currentTime,
          operationTime: 0,
        },
      };
    });
  },

  removeOnRoadBus: (id) => {
    set({
      busOperation: {
        ...get().busOperation,
        busesOnRoad: get().busOperation.busesOnRoad.filter((b) => b.id !== id),
      },
    });
  },
}));
