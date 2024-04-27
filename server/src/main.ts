import { AppRouter } from "./router";
import "./controllers/scrape.controller";

const app = AppRouter.getInstance();

app.register(require("@fastify/cors"), {
  origin: process.env.ORIGIN || "",
});

app.get("/", async (req, res) => {
  return "api";
});

export default app;
