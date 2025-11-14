/** @format */

import mongoose from "mongoose";
import { mongoURI } from "../constants/Constants";

class ConnectDb {
  constructor() {
    this.connected = false;
    this.connectDB();
  }

  connectDB() {
    mongoose.connect(mongoURI);

    mongoose.connection.on("connected", () => {
      this.connected = true;
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connection failed:", err.message);
    });
  }
}

export { ConnectDb };
