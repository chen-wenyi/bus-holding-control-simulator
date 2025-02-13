'use server';

import { del, put } from '@vercel/blob';
import AdmZip from 'adm-zip';
import Papa from 'papaparse';
import {
  OutputDict,
  Policy,
  PolicyOutputData,
  ProcessedPolicyOutputData,
  Statistics,
} from '../types';

const processZipFileToJson = (buffer: Buffer): Policy | undefined => {
  try {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();
    const map: { [key: number]: ProcessedPolicyOutputData[] } = {};

    let totalBunching = 0;
    zipEntries.forEach((entry) => {
      const fileName = entry.entryName;
      if (!fileName.includes('__MACOSX') && fileName.includes('.csv')) {
        const res = getProcessedData(entry.getData().toString('utf8'));
        if (res.processedOutputData.length > 45) {
          const allFromStops = res.processedOutputData.map((d) => d.from);
          const duplicates = allFromStops.filter((val, i) =>
            allFromStops.includes(val, i + 1)
          );
          console.warn(
            `${fileName} start with timestamp ${
              res.timeId
            } has more than 45 intervals. Duplicates keywords: ${duplicates.toString()}`
          );
        }
        map[res.timeId] = res.processedOutputData;
        totalBunching += res.bunching;
      }
    });

    const operationData = normalizedStartTime(map);

    return {
      statistics: {
        ...getStatistics(operationData),
        totalBunching,
      },
      operationData,
    };
  } catch (err) {
    console.error('Error unzipping file:', err);
  }
};

const getStatistics = (
  operationData: OutputDict
): Omit<Statistics, 'totalBunching'> => {
  const services = Object.values(operationData);
  const serviceLength = services.length;
  const lastService = services[serviceLength - 1];
  const totalOperationTime =
    lastService[lastService.length - 1].operationTime[1];

  const waitingTimes: number[] = [];
  const travelTimes: number[] = [];
  const dwellingTimes: number[] = [];
  const occupancies: number[] = [];

  services.forEach((service) => {
    const start = service[0].operationTime[0];
    const end = service[service.length - 1].operationTime[1];
    service.forEach(({ dwell, duration, occupancy }) => {
      waitingTimes.push(dwell + duration);
      dwellingTimes.push(dwell);
      occupancies.push(occupancy[1]);
    });
    travelTimes.push(end - start);
  });

  const avgWaitingTime =
    waitingTimes.reduce((acc, curr) => acc + curr, 0) / waitingTimes.length;
  const avgBusTravelTime =
    travelTimes.reduce((acc, curr) => acc + curr, 0) / travelTimes.length;
  const avgDwellingTime =
    dwellingTimes.reduce((acc, curr) => acc + curr, 0) / dwellingTimes.length;
  const avgOccupancy =
    occupancies.reduce((acc, curr) => acc + curr, 0) / occupancies.length;

  return {
    avgWaitingTime,
    avgBusTravelTime,
    avgDwellingTime,
    avgOccupancy,
    totalOperationTime,
  };
};

const normalizedStartTime = (map: OutputDict) => {
  const keys = Object.keys(map).map((k) => parseInt(k));
  const offset = keys[0];
  console.log('offset:', offset);
  const processedKeys = keys.map((k) => k - offset);
  const newMap: OutputDict = {};
  processedKeys.forEach((newKey, idx) => {
    newMap[newKey] = map[keys[idx]].map((data) => {
      return {
        ...data,
        operationTime: [
          data.operationTime[0] - offset,
          data.operationTime[1] - offset,
        ],
      };
    });
  });
  return newMap;
};

const replaceFirstLine = (fileContent: string, newHeader: string) => {
  const normalizedFileContent = fileContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const lines = normalizedFileContent.split('\n');
  lines[0] = newHeader;
  return lines.join('\n');
};

const getProcessedData = (content: string) => {
  content = replaceFirstLine(content, 'id,time,loc,op,stop');
  const parsedData = Papa.parse<PolicyOutputData>(content, {
    header: true,
    skipEmptyLines: true,
  });

  const policyOutputData = parsedData.data;

  const processedOutputData: ProcessedPolicyOutputData[] = [];
  const keyPointId: string[] = [];
  let isLookingForStopFlag = true;

  let prevStopId: undefined | string;
  let bunching = 0;
  let bunchingFlag = false;
  policyOutputData.forEach((data) => {
    if (isLookingForStopFlag) {
      if (parseInt(data.stop) !== -1) {
        if (prevStopId !== data.stop) {
          // rule out the incorrect data
          // looking for stop
          keyPointId.push(data.id);
          isLookingForStopFlag = false;
          prevStopId = data.stop;
          bunchingFlag = false;
        } else if (!bunchingFlag) {
          bunching++;
          bunchingFlag = true;
        }
      }
    } else {
      if (parseInt(data.stop) === -1) {
        // looking for dwell
        keyPointId.push(data.id);
        isLookingForStopFlag = true;
      }
    }
  });

  const timeId = parseInt(policyOutputData[0].time);
  let startTime = timeId;

  const res = { keyPointId, len: keyPointId.length };

  let prevOccupancy = 0;
  keyPointId.forEach((id, idx) => {
    const data = policyOutputData.find((data) => data.id === id)!;
    if (data.stop !== '-1' && idx !== res.keyPointId.length - 1) {
      const dwellId = keyPointId[idx + 1];
      const dwellData = policyOutputData.find((data) => data.id === dwellId)!;
      const dwell = parseInt(dwellData.time) - parseInt(data.time) - 1;
      const toStopId = keyPointId[idx + 2];
      const toStopData = policyOutputData.find((data) => data.id === toStopId)!;
      const duration = parseInt(toStopData.time) - parseInt(dwellData.time) + 1;

      const occupancy: [number, number] = [prevOccupancy, Number(data.op)];
      prevOccupancy = Number(data.op);

      processedOutputData.push({
        from: data.stop,
        to: toStopData.stop,
        dwell,
        duration,
        operationTime: [startTime, startTime + duration + dwell],
        occupancy,
      });
      startTime = startTime + duration + dwell;
    }
  });
  return { timeId: timeId, processedOutputData, bunching };
};

export async function uploadAction(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded');
  }

  const outputName = file.name.split('.zip')[0] + '.json';

  const fileData = Buffer.from(await file.arrayBuffer());

  const body = processZipFileToJson(fileData);
  if (body) {
    await uploadToBlob(outputName, body);
  }
}

export async function delOutputs(url: string) {
  await del(url);
}

async function uploadToBlob(fileName: string, body: Policy) {
  return await put(`outputs/${fileName}`, JSON.stringify(body), {
    access: 'public',
  });
}
