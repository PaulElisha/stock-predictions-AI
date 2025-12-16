/** @format */

import express from "express";
import type { Express } from "express";
import cors from "cors";
import { Db } from "./src/config/db.config.ts";
import { port, hostName } from "./src/constants/constants.ts";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.ts";

import { stockPredictionRouter } from "./src/routes/stock-prediction.route.ts";

class App {
  public app: Express;
  public db: Db;

  constructor() {
    this.app = express();
    this.db = new Db();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  initializeRoutes() {
    this.app.use("/api", stockPredictionRouter);
    this.app.use(errorHandler);
  }

  startServer() {
    this.db?.connect();
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} at ${hostName}:${port}`);
    });
  }
}

const app = new App();
app.startServer();
