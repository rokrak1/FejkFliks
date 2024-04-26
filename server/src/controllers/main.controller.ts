import { FastifyReply, FastifyRequest } from "fastify";
import { controller, get, schema } from "../decorators";
import { scrapeSubtitle } from "../services/puppeteer";

interface GetSubitlesQuerystring {
  fileName: string;
}

@controller("/api")
class MainController {
  @get("/ping")
  ping(req: FastifyRequest, reply: FastifyReply) {
    reply.send("pong");
  }

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
      const fileName = req.query.fileName;
      // TODO: Check bunny.net if the file is subtitle already exists
      const subtitleBuffer = await scrapeSubtitle(fileName);

      reply.header(
        "Content-Disposition",
        `attachment; filename="${fileName}.srt"`
      );
      reply.header("Content-Type", "text/plain");

      // Send the buffer
      reply.send(subtitleBuffer);
    } catch (error) {
      console.error(error);
      reply.send("error:" + error);
    }
  }
}
