export interface PolicyOutputData {
  id: string;
  time: string;
  loc: string;
  op: string;
  stop: string;
}

export interface PorcessedPolicyOutputData {
  from: string;
  to: string;
  duration: number;
  dwell: number;
  occupancy: [number, number];
}

export type OutputDict = { [key: number]: PorcessedPolicyOutputData[] };