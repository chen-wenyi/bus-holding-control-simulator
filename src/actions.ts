'use server';

import AdmZip from 'adm-zip';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

const unzipFile = (zipFilePath: string, outputDir: string) => {
  try {
    // Initialize the ZIP file
    const zip = new AdmZip(zipFilePath);

    // Extract to the specified directory
    zip.extractAllTo(outputDir, true); // The `true` parameter overwrites files if they exist
    console.log(`File unzipped successfully to ${outputDir}`);
  } catch (err) {
    console.error('Error unzipping file:', err);
  }
};

export async function uploadAction(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded');
  }

  const uploadDir = join(process.cwd(), 'uploads');
  const filePath = `${uploadDir}/${file.name}`;

  try {
    await mkdir(uploadDir, { recursive: true });
    console.log('Uploads directory is ready!');
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }

  const fileData = Buffer.from(await file.arrayBuffer());

  try {
    await writeFile(filePath, fileData);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('File upload failed');
  }

  unzipFile(filePath, uploadDir);
  rm(filePath, { recursive: true, force: true })
}
