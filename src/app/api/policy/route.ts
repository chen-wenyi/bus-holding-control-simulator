import { readdirSync, readFileSync } from 'fs';
import { NextRequest } from 'next/server';
import Papa from 'papaparse';
import { join } from 'path';

interface PolicyOutputData {
  id: string;
  time: string;
  loc: string;
  op: string;
  stop: string;
}

interface PorcessedPolicyOutputData {
  from: string;
  to: string;
  duration: number;
  boarding: number;
}

const replaceFirstLine = (fileContent: string, newHeader: string) => {
  const normalizedFileContent = fileContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const lines = normalizedFileContent.split('\n');
  lines[0] = newHeader;
  return lines.join('\n');
};

const getProcessedData = (filePath: string) => {
  let fileContent = readFileSync(filePath, 'utf8');
  fileContent = replaceFirstLine(fileContent, 'id,time,loc,op,stop');
  const parsedData = Papa.parse<PolicyOutputData>(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  const policyOutputData = parsedData.data;

  const processedOutputData: PorcessedPolicyOutputData[] = [];
  const keyPointId: string[] = [];
  let isLookingForStopFlag = true;
  policyOutputData.forEach((data) => {
    if (isLookingForStopFlag) {
      if (parseInt(data.stop) !== -1) {
        keyPointId.push(data.id);
        isLookingForStopFlag = false;
      }
    } else {
      if (parseInt(data.stop) === -1) {
        keyPointId.push(data.id);
        isLookingForStopFlag = true;
      }
    }
  });

  const timeId = policyOutputData[0].time;

  const res = { keyPointId, len: keyPointId.length };

  keyPointId.forEach((id, idx) => {
    const data = policyOutputData.find((data) => data.id === id)!;

    if (data.stop !== '-1' && idx !== res.keyPointId.length - 1) {
      const boardingId = keyPointId[idx + 1];
      const boardingData = policyOutputData.find(
        (data) => data.id === boardingId
      )!;
      const boarding = parseInt(boardingData.time) - parseInt(data.time) - 1;
      const toStopId = keyPointId[idx + 2];
      const toStopData = policyOutputData.find((data) => data.id === toStopId)!;
      const duration = parseInt(toStopData.time) - parseInt(boardingData.time);
      processedOutputData.push({
        from: data.stop,
        to: toStopData.stop,
        boarding,
        duration,
      });
    }
  });

  return { timeId: parseInt(timeId), processedOutputData };
};

const normalizedStartTime = (map: { [key: number]: PorcessedPolicyOutputData[] } ) => {
  const keys = Object.keys(map).map(k => parseInt(k))
  const offset = keys[0];
  const processedKeys = keys.map(k => k-offset);
  const newMap: { [key: number]: PorcessedPolicyOutputData[] } = {};
  processedKeys.forEach((newKey, idx) => {
    newMap[newKey] = map[keys[idx]];
  })
  return newMap;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const policyName = searchParams.get('policy');
  const policyPath = join(process.cwd(), `uploads/${policyName}`);
  const fileNames = readdirSync(policyPath).filter((fileName) =>
    fileName.includes('.csv')
  );
  const map: { [key: number]: PorcessedPolicyOutputData[] } = {};
  fileNames.forEach((name) => {
    const filePath = join(policyPath, name);
    const res = getProcessedData(filePath);
    map[res.timeId] = res.processedOutputData;
  });
  return Response.json(normalizedStartTime(map));
}
