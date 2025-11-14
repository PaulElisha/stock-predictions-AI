/** @format */

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const EnvConfig = {
  PORT: process.env.PORT || 3000,
  HOST_NAME: process.env.HOST_NAME,
  MONGO_URI: process.env.MONGO_URI,
};

export default EnvConfig;
