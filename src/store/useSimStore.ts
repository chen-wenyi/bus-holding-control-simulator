import { OutputDict, ProcessedPolicyOutputData, TimerStatus } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
  updateSimulationProgress: (seconds: number) => void;
  setTimerStatus: (status: TimerStatus) => void;
  setOperationTime: (second: number) => void;
  setTimerMultiplier: (multiplier: number) => void;
  updateNextBusIndex: () => void;
  removeOnRoadBus: (id?: number) => void;
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

export const useSimStore = create<SimStore>()(
  devtools(
    immer((set) => ({
      ...defaultState,
      toggleDebug: () =>
        set(
          (state) => {
            state.debuge = !state.debuge;
          },
          false,
          'toggleDebug'
        ),
      setView: (view) => set({ view }, false, 'setView'),
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
        set(
          {
            selectedOutput: {
              name,
              busTimeTable,
              buses,
              busNum,
              stopNum,
              totalOperationTime,
              value: outputVal,
            },
          },
          false,
          'setSelectedOutput'
        );
      },
      startSimulation: () => {
        set(
          (state) => {
            if (state.timer.status === 'idle') {
              const id = state.selectedOutput!.busTimeTable[0];
              const onRoadBus = [{ id, value: state.selectedOutput!.buses[0] }];
              state.busOperation.busesOnRoad = onRoadBus;
              state.busOperation.dispatchedBuses = onRoadBus;
              state.timer.status = 'started';
              state.timer.nextBusIndex = 1;
            } else {
              state.timer.status = 'started';
            }
          },
          false,
          'startSimulation'
        );
      },
      resetSimulation: () => {
        set(
          {
            timer: { status: 'idle', multiplier: 50, nextBusIndex: -1 },
            busOperation: defaultState.busOperation,
          },
          false,
          'resetSimulation'
        );
      },
      pauseSimulation: () => {
        set(
          (state) => {
            const operationTime = state.busOperation.operationTime;
            const breakpoint = state.busOperation.breakpoint + operationTime;
            state.timer.status = 'paused';
            state.busOperation.operationTime = 0;
            state.busOperation.breakpoint = breakpoint;
          },
          false,
          'pauseSimulation'
        );
      },
      updateSimulationProgress: (seconds) => {
        set(
          (state) => {
            const breakpoint = seconds;
            const busesOnRoad: {
              id: number;
              value: ProcessedPolicyOutputData[];
            }[] = [];
            let nextBusIndex = -1;
            let foundInAllServices = false;
            const allBuses = state.selectedOutput!.buses;
            const busTimeTable = state.selectedOutput!.busTimeTable;
            allBuses.forEach((service, idx) => {
              let foundInCurrentService = false;
              for (let i = 0; i < service.length; i++) {
                const bus = service[i];
                if (
                  bus.operationTime[0] <= breakpoint &&
                  bus.operationTime[1] >= breakpoint
                ) {
                  const initialProgress =
                    (breakpoint - bus.operationTime[0]) /
                    (bus.operationTime[1] - bus.operationTime[0]);
                  busesOnRoad.push({
                    id: busTimeTable[idx],
                    value: [
                      ...service.slice(0, i),
                      { ...bus, initialProgress },
                      ...service.slice(i + 1),
                    ],
                  });
                  foundInAllServices = true;
                  foundInCurrentService = true;
                  break;
                }
              }
              if (
                foundInAllServices &&
                !foundInCurrentService &&
                nextBusIndex === -1
              ) {
                nextBusIndex = idx;
              }
            });

            const dispatchedBuses = new Array(
              nextBusIndex === -1 ? allBuses.length : nextBusIndex
            )
              .fill(0)
              .map((_, idx) => ({
                id: busTimeTable[idx],
                value: allBuses[idx],
              }));

            state.timer.nextBusIndex = nextBusIndex;
            state.timer.status = 'paused';
            state.busOperation.operationTime = 0;
            state.busOperation.breakpoint = breakpoint;
            state.busOperation.busesOnRoad = busesOnRoad;
            state.busOperation.dispatchedBuses = dispatchedBuses;
          },
          false,
          'updateSimulationProgress'
        );
      },
      setTimerStatus: (status) => {
        set(
          (state) => {
            state.timer.status = status;
          },
          false,
          'setTimerStatus'
        );
      },
      setOperationTime: (second) => {
        set(
          (state) => {
            state.busOperation.operationTime = second;
          },
          false,
          'setOperationTime'
        );
      },
      setTimerMultiplier: (multiplier) => {
        set(
          (state) => {
            state.timer.multiplier = multiplier;
          },
          false,
          'setTimerMultiplier'
        );
      },
      updateNextBusIndex: () => {
        set(
          (state) => {
            const currBusIndex = state.timer.nextBusIndex;
            const dispatchBus = state.selectedOutput!.buses[currBusIndex];
            const id = state.selectedOutput!.busTimeTable[currBusIndex];
            if (currBusIndex < state.selectedOutput!.busNum - 1) {
              const nextBusIndex = currBusIndex + 1;
              state.busOperation.busesOnRoad.push({ id, value: dispatchBus });
              state.busOperation.dispatchedBuses.push({
                id,
                value: dispatchBus,
              });
              state.timer.nextBusIndex = nextBusIndex;
            } else {
              state.timer.nextBusIndex = -1;
              state.busOperation.busesOnRoad.push({ id, value: dispatchBus });
              state.busOperation.dispatchedBuses.push({
                id,
                value: dispatchBus,
              });
            }
          },
          false,
          'updateNextBusIndex'
        );
      },
      removeOnRoadBus: (id) => {
        set(
          (state) => {
            if (id === undefined) {
              state.busOperation.busesOnRoad = [];
            } else {
              state.busOperation.busesOnRoad =
                state.busOperation.busesOnRoad.filter((b) => b.id !== id);
            }
          },
          false,
          'removeOnRoadBus'
        );
      },
      setPassengerCapacity: (value) => {
        set(
          (state) => {
            state.busOperation.passengerCapacity = value;
          },
          false,
          'setPassengerCapacity'
        );
      },
    }))
  )
);
