/** @format */

import { getEnv } from "../config/env.helper.js";

export const port = getEnv("PORT", "3000");
export const hostName = getEnv("HOST_NAME", "http://localhost");
export const mongoURI = getEnv("MONGODB_URI", "mongodb://localhost:27017/");
export const openAIApiKey = getEnv("OPENAI_API_KEY");
export const polygonApiKey = getEnv("POLYGON_API_KEY");
export const polygonUrl = getEnv("POLYGON_BASE_URL", "https://api.polygon.io");
export const openAIWorkerUrl = getEnv("OPENAI_WORKER_URL");
export const polygonWorkerUrl = getEnv("POLYGON_WORKER_URL");
export const mistralServerUrl = getEnv(
  "MISTRAL_SERVER_URL",
  "https://api.mistral.ai"
);
export const mistralAiApiKey = getEnv("MISTRAL_AI_API_KEY");

// Helper functions to get dates (avoiding circular dependency)
function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDateNDaysAgo(n: number) {
  const now = new Date();
  now.setDate(now.getDate() - n);
  return formatDate(now);
}

export const startDate = getDateNDaysAgo(3);
export const endDate = getDateNDaysAgo(1);
