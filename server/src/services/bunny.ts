import fs from "fs";
import path from "path";
import * as ftp from "basic-ftp";

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
  const tmpPath = path.join(process.cwd(), "tmp", `${fileName}.srt`);

  // Create tmp file
  fs.writeFileSync(tmpPath, buffer);

  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.BUNNY_BASE_HOSTNAME,
      user: process.env.BUNNY_FTP_USER,
      password: process.env.BUNNY_FTP_PASS,
      port: 21,
    });
    await client.uploadFrom(tmpPath, `Subtitles/${fileName}.srt`);

    // Remove tmp file
    fs.unlinkSync(tmpPath);
  } catch (err) {
    console.error(err);
  }
  client.close();
};
