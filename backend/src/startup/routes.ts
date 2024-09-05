import { Express, json } from "express";
import morgan from "morgan";
import error from "../middleware/error";
import generator from "../routes/generator";
import home from "../routes/home";

function routes(app: Express) {
  app.use(json());
  app.use(morgan("tiny"));
  app.use("/api", home);
  app.use("/api/generator", generator);
  app.use(error);
}

export default routes;
