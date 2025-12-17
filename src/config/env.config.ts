/** @format */

import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import type { EnvConfig } from "../types/config/env-config.types.js";

const getEnvConfig = (): EnvConfig => {
  const getEnv = (key: string, defaultValue: string = ""): string => {
    const value = process.env[key];
    if (!value) {
      if (!defaultValue) {
        console.warn(`Warning: Missing environment variable: ${key}`);
      }
      return defaultValue;
    }
    return value;
  };

  return {
    PORT: getEnv("PORT", "3000"),
    HOST_NAME: getEnv("HOST_NAME", "http://localhost"),
    MONGODB_URI: getEnv("MONGODB_URI", "mongodb://localhost:27017/"),
    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
    POLYGON_API_KEY: getEnv("POLYGON_API_KEY"),
    POLYGON_BASE_URL: getEnv("POLYGON_BASE_URL", "https://api.polygon.io"),
    POLYGON_WORKER_URL: getEnv("POLYGON_WORKER_URL"),
    OPENAI_WORKER_URL: getEnv("OPENAI_WORKER_URL"),
    MISTRAL_SERVER_URL: getEnv("MISTRAL_SERVER_URL", "https://api.mistral.ai"),
    MISTRAL_AI_API_KEY: getEnv("MISTRAL_AI_API_KEY"),
  };
};

export const envConfig = getEnvConfig();
