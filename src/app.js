/** @format */

import express from "express";

import { ConnectDb } from "./config/ConnectDb.js";
import { port, hostName } from "./constants/Constants.js";

class App {
  constructor() {
    this.app = express();
    this.db = new ConnectDb();
  }

  startServer() {
    this.db.connect();
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} at ${hostName}`);
    });
  }
}

const app = new App();
app.startServer();
