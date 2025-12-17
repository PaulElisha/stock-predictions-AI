/** @format */

import mongoose from "mongoose";
import { mongoURI } from "../constants/constants.js";

class Db {
  connect() {
    if (!mongoURI) {
      console.warn("MongoDB URI not configured, skipping database connection");
      return;
    }

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
      // Don't exit in serverless environments
    }
  }
}

export { Db };
