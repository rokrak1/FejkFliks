import fs from "fs";
import path from "path";
import { ElementHandle, Page } from "puppeteer";

export function saveBase64AsFile(base64Data: string, filename: string) {
  const extension = ".srt";
  const completeFilename = filename + extension;
  const base64ContentArray = base64Data.split(";base64,");
  const fileContent = base64ContentArray[1];
  const fileBuffer = Buffer.from(fileContent, "base64");
  fs.writeFileSync(
    path.join(process.cwd(), "tmp", completeFilename),
    fileBuffer
  );
  console.log(`File saved as ${completeFilename}`);
}

interface ReponseData {
  base64: string;
  error: Error;
}

export async function fetchData(
  page: Page,
  link: ElementHandle<Element>,
  headers: HeadersInit
) {
  const linkHref = await link.evaluate((el) => (el as HTMLAnchorElement).href);

  return (await page.evaluate(
    (url, hdrs) => {
      return fetch(url, {
        method: "GET",
        headers: hdrs,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({
                base64: reader.result,
                error: null,
              });
            reader.onerror = () => reject(new Error("FileReader error"));
            reader.readAsDataURL(blob);
          });
        })
        .catch((error) => {
          return { base64: "", error };
        });
    },
    linkHref,
    headers
  )) as ReponseData;
}

interface TitleData {
  name: string;
  type: Category;
  season: number | null;
  episode: number | null;
  year?: number;
  otherSpecs: string[];
}

export enum Category {
  TV_SHOW = "Tv Shows",
  MOVIES = "Movies",
}

export function parseTitle(title: string): TitleData | null {
  // Regex for series - captures series name, season, and episode numbers
  const seriesRegex = /^(.*?)\.S(\d+)E(\d+)\.(.*?)(\d{3,4}p)/;
  const movieRegex = /^(.*?)\s(\d{4})\s(.*?)(\d{3,4}p)/;

  let match = title.match(seriesRegex);
  if (match) {
    return {
      name: match[1].replace(/\./g, " "),
      type: Category.TV_SHOW,
      season: parseInt(match[2], 10),
      episode: parseInt(match[3], 10),
      otherSpecs: match[4]
        .split(".")
        .concat(match[5].split("."))
        .filter(Boolean),
    };
  } else {
    match = title.match(movieRegex);
    if (match) {
      return {
        name: match[1].replace(/\./g, " "),
        type: Category.MOVIES,
        season: null,
        episode: null,
        year: parseInt(match[2], 10),
        otherSpecs: match[3]
          .split(".")
          .concat(match[4].split("."))
          .filter(Boolean),
      };
    }
  }
  return null;
}
