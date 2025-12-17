/** @format */

import { envConfig } from "../config/env.config.js";

export const port = envConfig.PORT;
export const hostName = envConfig.HOST_NAME;
export const mongoURI = envConfig.MONGODB_URI;
export const openAIApiKey = envConfig.OPENAI_API_KEY;
export const polygonApiKey = envConfig.POLYGON_API_KEY;
export const polygonUrl = envConfig.POLYGON_BASE_URL;
export const openAIWorkerUrl = envConfig.OPENAI_WORKER_URL;
export const polygonWorkerUrl = envConfig.POLYGON_WORKER_URL;
export const mistralServerUrl = envConfig.MISTRAL_SERVER_URL;
export const mistralAiApiKey = envConfig.MISTRAL_AI_API_KEY;

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
