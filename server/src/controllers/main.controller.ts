import { FastifyReply, FastifyRequest } from "fastify";
import { controller, get } from "../decorators";
import { scrapeSubtitle } from "../services/puppeteer";

@controller("/api")
class MainController {
  @get("/ping")
  ping(req: FastifyRequest, reply: FastifyReply) {
    reply.send("pong");
  }

  @get("/scrape")
  async scrape(req: FastifyRequest, reply: FastifyReply) {
    try {
      const found = await scrapeSubtitle(
        "The.Boys.S01E02.1080p.BluRay.x265-YAWNiX"
      );
      reply.send("scrape");
    } catch (error) {
      console.error(error);
      reply.send("error:" + error);
    }
  }
}
