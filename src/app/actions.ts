'use server';

import { del, put } from '@vercel/blob';
import AdmZip from 'adm-zip';
import Papa from 'papaparse';
import { OutputDict, PolicyOutputData, PorcessedPolicyOutputData } from '../types';

const processZipFileToJson = (buffer: Buffer) => {
  try {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();
    const map: { [key: number]: PorcessedPolicyOutputData[] } = {};

    zipEntries.forEach((entry) => {
      const fileName = entry.entryName;
      if (!fileName.includes('__MACOSX') && fileName.includes('.csv')) {
        const res = getProcessedData(entry.getData().toString('utf8'));
        map[res.timeId] = res.processedOutputData;
      }
    });
    return normalizedStartTime(map);
  } catch (err) {
    console.error('Error unzipping file:', err);
  }
};

const normalizedStartTime = (map: OutputDict) => {
  const keys = Object.keys(map).map((k) => parseInt(k));
  const offset = keys[0];
  const processedKeys = keys.map((k) => k - offset);
  const newMap: OutputDict = {};
  processedKeys.forEach((newKey, idx) => {
    newMap[newKey] = map[keys[idx]];
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

  const processedOutputData: PorcessedPolicyOutputData[] = [];
  const keyPointId: string[] = [];
  let isLookingForStopFlag = true;
  policyOutputData.forEach((data) => {
    if (isLookingForStopFlag) {
      if (parseInt(data.stop) !== -1) { // looking for stop
        keyPointId.push(data.id);
        isLookingForStopFlag = false;
      }
    } else {
      if (parseInt(data.stop) === -1) { // looking for dwell
        keyPointId.push(data.id);
        isLookingForStopFlag = true;
      }
    }
  });

  const timeId = policyOutputData[0].time;

  const res = { keyPointId, len: keyPointId.length };

  let prevOccupancy = 0;
  keyPointId.forEach((id, idx) => {
    const data = policyOutputData.find((data) => data.id === id)!;
    if (data.stop !== '-1' && idx !== res.keyPointId.length - 1) {
      const dwellId = keyPointId[idx + 1];
      const dwellData = policyOutputData.find(
        (data) => data.id === dwellId
      )!;
      const dwell = parseInt(dwellData.time) - parseInt(data.time) - 1;
      const toStopId = keyPointId[idx + 2];
      const toStopData = policyOutputData.find((data) => data.id === toStopId)!;
      const duration = parseInt(toStopData.time) - parseInt(dwellData.time);

      const occupancy: [number, number] = [prevOccupancy, Number(data.op)]
      prevOccupancy = Number(data.op)

      processedOutputData.push({
        from: data.stop,
        to: toStopData.stop,
        dwell,
        duration,
        occupancy
      });
    }
  });

  return { timeId: parseInt(timeId), processedOutputData };
};

export async function uploadAction(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded');
  }

  const outputName = file.name.split('.zip')[0] + '.json';

  const fileData = Buffer.from(await file.arrayBuffer());

  await put(
    `outputs/${outputName}`,
    JSON.stringify(processZipFileToJson(fileData)),
    { access: 'public' }
  );
}

export async function delOutputs(url: string) {
  await del(url);
}
