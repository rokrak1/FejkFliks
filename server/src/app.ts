import { AppRouter } from "./router";
import "./controllers/scrape.controller";

const app = AppRouter.getInstance();

app.register(require("@fastify/cors"), {
  origin: "http://localhost:5173",
});

export default app;
