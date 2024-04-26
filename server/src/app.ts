import { AppRouter } from "./router";
import "./controllers/main.controller";

const app = AppRouter.getInstance();

app.register(require("@fastify/cors"), {
  origin: "http://localhost:5173",
});

app.get("/", async (request, reply) => {
  return "200";
});

export default app;
