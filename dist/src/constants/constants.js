/** @format */
import { envConfig } from "../config/env.config.ts";
import { Dates } from "../utils/Dates.ts";
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
export const startDate = Dates.getDateNDaysAgo(3);
export const endDate = Dates.getDateNDaysAgo(1);
