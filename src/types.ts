export interface PolicyOutputData {
  id: string;
  time: string;
  loc: string;
  op: string;
  stop: string;
}

export interface ProcessedPolicyOutputData {
  from: string;
  to: string;
  duration: number;
  dwell: number;
  operationTime: [number, number];
  occupancy: [number, number];
  initialProgress?: number;
}

export type OutputDict = { [key: number]: ProcessedPolicyOutputData[] };

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number; // second
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number; // second
}

export type TimerStatus = 'idle' | 'paused' | 'started' | 'ended';

export type Statistics = {
  avgWaitingTime: number; // avg( duration + dwell time )
  avgBusTravelTime: number; // bus operation time / bus num
  avgDwellingTime: number; // avg dwelling time
  avgOccupancy: number; // avg occupancy
  totalOperationTime: number; // total time of services
  totalBunching: number; // from data analysis
};

export type Policy = {
  statistics: Statistics;
  operationData: OutputDict;
};
