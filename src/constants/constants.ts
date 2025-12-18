/** @format */

import { envConfig } from "../config/env.config.ts";

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

// console.log("Host Name", mongoURI);
// console.log("Port ", port);
// console.log("hostName", hostName);
// console.log("openAIApiKey", openAIApiKey);
// console.log("polygonApiKey", polygonApiKey);
// console.log("polygonUrl", polygonUrl);
// console.log("openAIWorkerUrl", openAIWorkerUrl);
// console.log("polygonWorkerUrl", polygonWorkerUrl);
// console.log("mistralServerUrl", mistralServerUrl);
// console.log("mistralAiApiKey", mistralAiApiKey);
