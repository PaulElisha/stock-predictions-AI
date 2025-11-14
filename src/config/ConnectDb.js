/** @format */

import mongoose from "mongoose";
import { mongoURI } from "../constants/Constants.js";

class ConnectDb {
  async connect() {
    await mongoose.connect(mongoURI);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connection failed:", err.message);
    });
  }
}

export { ConnectDb };
