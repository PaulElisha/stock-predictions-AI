/** @format */

import mongoose from "mongoose";
import { mongoURI } from "../constants/constants.ts";

class Db {
  connect() {
    try {
      mongoose.connect(mongoURI);

      mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
      });

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err.message);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
}

export { Db };
