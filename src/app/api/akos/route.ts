export const revalidate = 60 * 60 * 24; // 24 hours in seconds
import fetch from 'node-fetch';
const AdmZip = require('adm-zip');


export async function GET() {
  const zipUrl = 'https://cap-apc.ic.gc.ca/datafiles/amateur_delim.zip';

  try {
    // Fetch the zip file
    const response = await fetch(zipUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch zip file: ${response.statusText}`);
    }

    // Buffer the zip file content
    const buffer = await response.buffer();

    // Load the zip file into adm-zip
    const zip = new AdmZip(buffer);

    // Extract the specific file
    const targetFile = 'amateur_delim.txt';
    const zipEntries = zip.getEntries();
    let fileContent = '';

    zipEntries.forEach((entry) => {
      if (entry.entryName === targetFile) {
        fileContent = entry.getData().toString('utf8');
      }
    });

    if (!fileContent) {
      throw new Error(`${targetFile} not found in the zip archive`);
    }
  const csv = res.status(200).text(fileContent);
  const calls = csv
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => line.split(';')[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    return Response.json(calls);
}
