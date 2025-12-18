/** @format */

import type { EnvConfig } from "../types/config/env-config.types.js";

import dotenv from "dotenv";
dotenv.config();

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
    PORT: getEnv("PORT"),
    HOST_NAME: getEnv("HOST_NAME"),
    MONGODB_URI: getEnv("MONGODB_URI"),
    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
    POLYGON_API_KEY: getEnv("POLYGON_API_KEY"),
    POLYGON_BASE_URL: getEnv("POLYGON_BASE_URL"),
    POLYGON_WORKER_URL: getEnv("POLYGON_WORKER_URL"),
    OPENAI_WORKER_URL: getEnv("OPENAI_WORKER_URL"),
    MISTRAL_SERVER_URL: getEnv("MISTRAL_SERVER_URL"),
    MISTRAL_AI_API_KEY: getEnv("MISTRAL_AI_API_KEY"),
  };
};

export const envConfig = getEnvConfig();
