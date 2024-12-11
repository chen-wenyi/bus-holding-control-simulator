import { readdirSync } from 'fs';
import { join } from 'path';

const ignore = ['__MACOSX', '.DS_Store']

export async function GET() {
  const directoryPath = join(process.cwd(), 'uploads');
  const fileNames = readdirSync(directoryPath).filter(fileName => !ignore.includes(fileName));
  return Response.json(fileNames);
}
