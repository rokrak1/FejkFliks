import { ElementHandle, Page } from "puppeteer";

export function arrayBufferToBuffer(arrayBuffer: ArrayBuffer) {
  return Buffer.from(arrayBuffer);
}

export function convertSrtToVtt(text: string) {
  let vttContent = "WEBVTT\n\n";

  const srtLines = text.split("\n");
  for (const line of srtLines) {
    const vttTimestamp = line.replace(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})/g,
      "$1:$2:$3.$4"
    );
    vttContent += vttTimestamp + "\n";
  }

  return Buffer.from(vttContent, "utf-8");
}

interface ResponseData {
  text: string | null;
  error: Error | null;
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
          return response.text();
        })
        .then((text) => {
          return { text, error: null };
        })
        .catch((error) => {
          return { text: null, error };
        });
    },
    linkHref,
    headers
  )) as ResponseData;
}

interface TitleData {
  name: string;
  type: Category;
  season: number | null;
  episode: number | null;
  resolution: string | null;
  source?: string;
  encoding?: string;
  year?: number;
  releaseGroup?: string;
}

export enum Category {
  TV_SHOW = "Tv Shows",
  MOVIES = "Movies",
}

export function parseTitle(title: string): TitleData | null {
  const seriesRegex =
    /^(.+?)\s+S(\d+)E(\d+)(?:\s+(.*?))?(?:\s+(\d{3,4}p))?\s*(WEBRip|HDTV|BluRay|BRRip)?\s*(x264|x265)?(?:-(\w+))?/i;
  const movieRegex = /^(.*?)\s+(\d{4})\s(.*?)(\d{3,4}p)?$/;

  let match = title.match(seriesRegex);
  if (match) {
    return {
      name: match[1].trim(),
      type: Category.TV_SHOW,
      season: parseInt(match[2], 10),
      episode: parseInt(match[3], 10),
      resolution: match[5],
      source: match[6],
      encoding: match[7],
      releaseGroup: match[8],
    };
  } else {
    match = title.match(movieRegex);
    if (match) {
      return {
        name: match[1].replace(/\./g, " "),
        type: Category.MOVIES,
        year: parseInt(match[2], 10),
        resolution: match[3],
        season: null,
        episode: null,
      };
    }
  }
  return null;
}
