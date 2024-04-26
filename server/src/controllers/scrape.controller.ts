import { FastifyReply, FastifyRequest } from "fastify";
import { controller, get, schema } from "../decorators";
import { scrapeSubtitle } from "../services/puppeteer";
import { fetchSubtitleFromBunnyNet } from "../services/bunny";

interface GetSubitlesQuerystring {
  fileName: string;
}

@controller("/scrape")
class ScrapeController {
  @get<{ Querystring: GetSubitlesQuerystring }>("/getSubtitles")
  @schema({
    querystring: {
      fileName: { type: "string" },
    },
  })
  async scrape(
    req: FastifyRequest<{ Querystring: GetSubitlesQuerystring }>,
    reply: FastifyReply
  ) {
    try {
      console.log("I RUN");
      const fileName = req.query.fileName;

      let subtitleBuffer = null;

      // Fetch subtitle from bunny.net
      try {
        subtitleBuffer = await fetchSubtitleFromBunnyNet(fileName);
      } catch (error) {
        // console.error(error);
      }

      if (!subtitleBuffer) {
        subtitleBuffer = await scrapeSubtitle(fileName);
      }

      reply.header(
        "Content-Disposition",
        `attachment; filename="${fileName}.srt"`
      );
      reply.header("Content-Type", "text/plain");

      // Send the buffer
      return reply.send(subtitleBuffer);
    } catch (error) {
      console.error(error);
      return reply.send("error:" + error);
    }
  }
}
