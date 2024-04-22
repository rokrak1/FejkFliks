import { AppRouter } from "./router";
import "./controllers/main.controller";

const app = AppRouter.getInstance();

app.get("/", async (request, reply) => {
  return "200";
});

export default app;
