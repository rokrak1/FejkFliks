import puppeteer, { Page } from "puppeteer";
import {
  fetchData,
  parseTitle,
  Category,
  TitleData,
} from "../utils/puppeteer.utils";
import { uploadSubtitleToBunnyNet } from "./bunny";

var headers = {};

const mySubsUrl = "https://www.my-subs.co/";

const searchForSubtitle = async (query: string, page: Page) => {
  const inputSelector = 'input[placeholder="Search"]';
  await page.waitForSelector(inputSelector, { timeout: 2000 });
  await page.type(inputSelector, query);
  page.waitForNavigation();
  await page.click("button[title='Search']");
  await page.waitForSelector("#search_panel .list-group-item", {
    timeout: 2000,
  });
};

const getResult = async (category: Category, page: Page) => {
  const parentElements = await page.$$("#search_panel");
  for (const parentElement of parentElements) {
    const bText = await parentElement.evaluate((el) =>
      el.querySelector("b") ? el.querySelector("b")?.innerText : null
    );

    if (bText === category) {
      const element = await parentElement.$(".list-group-item");
      if (element) {
        const text = await page.evaluate(
          (el) => (el as HTMLElement).innerText,
          element
        );
        if (text.includes("No result")) {
          throw new Error(`No results found for category: ${category}`);
        }
        return element;
      }
    }
  }
  throw new Error(`Error finding category: ${category}`);
};

const episodeSelector = async (page: Page, season: number, episode: number) => {
  const episodes = await page.$$(`#collapssaison${season} .list-group-item`);
  for (const item of episodes) {
    const bText = await item.evaluate((el) =>
      el.querySelector("div") ? el.querySelector("div")?.innerText : null
    );
    if (bText === `Episode ${episode}`) {
      item.click();
      return;
    }
  }
  throw new Error(`Episode ${episode} not found`);
};

const sessionSelector = async (page: Page, season: number, episode: number) => {
  const session = await page.$$(`.list-group-item`);

  for (const item of session) {
    const bText = await item.evaluate((el) =>
      el.querySelector("b") ? el.querySelector("b")?.innerText : null
    );
    if (bText === `Season ${season}`) {
      item.click();
      return;
    }
  }
  throw new Error(`Season ${season} not found`);
};

const twShowHandler = async (
  page: Page,
  season: number,
  episode: number,
  fileName: string
) => {
  const result = await getResult(Category.TV_SHOW, page);

  await Promise.all([
    page.waitForNavigation({ timeout: 5000 }),
    result.click(),
  ]);

  await sessionSelector(page, season, episode);

  await page.waitForSelector(`#collapssaison${season} .list-group-item`);

  await episodeSelector(page, season, episode);

  await page.waitForSelector(".lang i");

  const rows = await page.$$(".row");
  for (const row of rows) {
    const language = await row.$(".lang i");

    if (!language) continue;

    const languageText = await language.evaluate(
      (el) => (el as HTMLElement).innerText
    );

    if (languageText === "English") {
      const downloadLink = await row.$(`a[rel="nofollow"]`);

      if (!downloadLink) continue;

      downloadLink.click();
      break;
    }
  }

  await page.waitForSelector("#downloadBtn");

  const downloadBtn = await page.$("#downloadBtn");
  if (!downloadBtn) {
    throw new Error("Download button not found");
  }

  const link = await page.$("#content a");
  if (!link) {
    throw new Error("Download link not found");
  }

  const responseData = await fetchData(page, link, headers);
  if (responseData.error) {
    throw new Error(responseData.error.message);
  }

  // Upload to bunny.net
  const buffer = Buffer.from(responseData.text!, "utf-8");
  try {
    await uploadSubtitleToBunnyNet(fileName, buffer);
  } catch (error) {
    console.error("ERRORSON", error);
  }

  return buffer;
};

const movieHandler = (page: Page) => {};

const scrapeMain = async (page: Page, titleData: TitleData) => {
  const { name, season, episode, type, fileName } = titleData;

  try {
    const query = name;
    await searchForSubtitle(query, page);

    const category = type;
    if (category === Category.TV_SHOW) {
      if (season === null || episode === null) {
        throw new Error("Season or episode not provided");
      }
      return await twShowHandler(page, season, episode, fileName);
    } else if (category === Category.MOVIES) {
      return await movieHandler(page);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const scrapeSubtitle = async (fileName: string) => {
  if (!fileName) {
    throw new Error("No file name provided");
  }

  const titleData = parseTitle(fileName);
  if (!titleData) {
    throw new Error("Error parsing title data");
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    // Navigate to the target page
    await page.goto(mySubsUrl, { waitUntil: "domcontentloaded" });

    await page.setRequestInterception(true);

    // Add event listener to intercept requests
    page.on("request", (interceptedRequest) => {
      interceptedRequest.continue();
    });

    // Listen to response
    page.on("response", async (response) => {
      const request = response.request();
      if (request.url().includes("/downloads")) {
        headers = request.headers();
      }
    });

    const buffer = await scrapeMain(page, titleData);

    if (!buffer) {
      throw new Error("Error scraping subtitle");
    }

    await browser.close();

    return buffer;
  } catch (error) {
    await browser.close();
    throw new Error("Unknown error occurred" + error);
  }
};
