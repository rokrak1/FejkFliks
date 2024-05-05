import fs from "fs";
import path from "path";
import * as ftp from "basic-ftp";
import { Readable } from "stream";

export const fetchSubtitleFromBunnyNet = async (fileName: string) => {
  const tmpPath = path.join(process.cwd(), "tmp", `${fileName}.srt`);

  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.BUNNY_BASE_HOSTNAME,
      user: process.env.BUNNY_FTP_USER,
      password: process.env.BUNNY_FTP_PASS,
      port: 21,
    });
    await client.downloadTo(tmpPath, `Subtitles/${fileName}.srt`);

    const buffer = fs.readFileSync(tmpPath);

    // Remove tmp file
    fs.unlinkSync(tmpPath);

    return buffer;
  } catch (err) {
    console.error(err);
  }
  client.close();
};

export const uploadSubtitleToBunnyNet = async (
  fileName: string,
  buffer: Buffer
) => {
  const stream = Readable.from(buffer);

  // Create tmp file

  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.BUNNY_BASE_HOSTNAME,
      user: process.env.BUNNY_FTP_USER,
      password: process.env.BUNNY_FTP_PASS,
      port: 21,
    });
    await client.uploadFrom(stream, `Subtitles/${fileName}.srt`);
    console.log("Uploaded to bunny.net", fileName);
  } catch (err) {
    console.error("err,", err);
  }
  client.close();
};
