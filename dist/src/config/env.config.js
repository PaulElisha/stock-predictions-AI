/** @format */
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const getEnvConfig = () => {
    const getEnv = (key) => {
        if (!process.env[key]) {
            throw new Error(`Missing environment variable: ${key}`);
        }
        return process.env[key];
    };
    return {
        PORT: getEnv("PORT") || "3000",
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
