import { FastifyReply, FastifyRequest } from "fastify";
import { controller, get } from "../decorators";

@controller("/api")
class MainController {
  @get("/ping")
  ping(req: FastifyRequest, reply: FastifyReply) {
    reply.send("pong");
  }
}
