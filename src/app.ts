/** @format */

import express from "express";
import type { Express } from "express";
import cors from "cors";
import { Db } from "./config/db.config.ts";
import { port, hostName } from "./constants/constants.ts";
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";

import { stockPredictionRouter } from "./routes/stock-prediction.route.ts";

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

const appInstance = new App();
const app = appInstance.app;

// Only start the server if this file is the main entry point (not imported by Vercel)
// In Vercel, we export the app to be used as a serverless function
if (import.meta.url === `file://${process.argv[1]}`) {
  appInstance.startServer();
}

export default app;
export { app };
