/** @format */

import express from "express";

import type { Express } from "express";
import cors from "cors";
import { Db } from "./config/db.config.js";
import { port, hostName, corsOrigin } from "./constants/constants.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { limiter } from "./config/limiter.config.js";

import { stockPredictionRouter } from "./routes/stock-prediction.route.js";

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
        origin: corsOrigin,
      }),
    );
    this.app.use(limiter);

  }

  async initializeDb() {
    await this.db.connect();
  }

  initializeRoutes() {
    this.app.use("/api", stockPredictionRouter);
    this.app.use(errorHandler);
  }

  async startServer() {
    await this.initializeDb();
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} at ${hostName}:${port}`);
    });
  }
}

const appInstance = new App();
const app = appInstance.app;

// Start server locally; on Vercel the app is exported as a serverless function
// if (!process.env.VERCEL) {
//   appInstance.startServer();
// }

appInstance.startServer();

export default app;
export { app };
