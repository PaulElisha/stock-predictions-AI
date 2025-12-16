"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDate = exports.startDate = exports.mistralAiApiKey = exports.mistralServerUrl = exports.polygonWorkerUrl = exports.openAIWorkerUrl = exports.polygonUrl = exports.polygonApiKey = exports.openAIApiKey = exports.mongoURI = exports.hostName = exports.port = void 0;
var env_config_ts_1 = require("../config/env.config.ts");
var Dates_ts_1 = require("../utils/Dates.ts");
exports.port = env_config_ts_1.envConfig.PORT;
exports.hostName = env_config_ts_1.envConfig.HOST_NAME;
exports.mongoURI = env_config_ts_1.envConfig.MONGODB_URI;
exports.openAIApiKey = env_config_ts_1.envConfig.OPENAI_API_KEY;
exports.polygonApiKey = env_config_ts_1.envConfig.POLYGON_API_KEY;
exports.polygonUrl = env_config_ts_1.envConfig.POLYGON_BASE_URL;
exports.openAIWorkerUrl = env_config_ts_1.envConfig.OPENAI_WORKER_URL;
exports.polygonWorkerUrl = env_config_ts_1.envConfig.POLYGON_WORKER_URL;
exports.mistralServerUrl = env_config_ts_1.envConfig.MISTRAL_SERVER_URL;
exports.mistralAiApiKey = env_config_ts_1.envConfig.MISTRAL_AI_API_KEY;
exports.startDate = Dates_ts_1.Dates.getDateNDaysAgo(3);
exports.endDate = Dates_ts_1.Dates.getDateNDaysAgo(1);
