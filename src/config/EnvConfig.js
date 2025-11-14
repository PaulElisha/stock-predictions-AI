/** @format */

import dotenv from "dotenv";
dotenv.config();

const EnvConfig = {
  PORT: process.env.PORT || 3000,
  HOST_NAME: process.env.HOST_NAME || "http://localhost",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
};

export default EnvConfig;
