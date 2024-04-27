import Fastify, { FastifyInstance } from "fastify";
import http from "http";

export class AppRouter {
  private static instance: FastifyInstance;

  static getInstance(): FastifyInstance {
    if (!AppRouter.instance) {
      AppRouter.instance = Fastify({
        logger: true,
        serverFactory(handler) {
          const server = http.createServer((req, res) => handler(req, res));
          return server;
        },
      });
    }
    return AppRouter.instance;
  }
}
