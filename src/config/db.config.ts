/** @format */

import mongoose from "mongoose";

class Db {
  connect() {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

    if (!mongoURI || mongoURI === "mongodb://localhost:27017/") {
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
