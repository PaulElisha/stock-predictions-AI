// app.ts
import express from "express";
import cors from "cors";

// src/config/db.config.ts
import mongoose from "mongoose";

// src/config/env.config.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
var getEnvConfig = () => {
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
    MISTRAL_AI_API_KEY: getEnv("MISTRAL_AI_API_KEY")
  };
};
var envConfig = getEnvConfig();

// src/utils/Dates.ts
var Dates = class _Dates {
  static formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  static getDateNDaysAgo(n) {
    const now = /* @__PURE__ */ new Date();
    now.setDate(now.getDate() - n);
    return _Dates.formatDate(now);
  }
  // export const dates = {
  //     startDate: getDateNDaysAgo(3), // alter days to increase/decrease data set
  //     endDate: getDateNDaysAgo(1) // leave at 1 to get yesterday's data
  // }
};

// src/constants/constants.ts
var port = envConfig.PORT;
var hostName = envConfig.HOST_NAME;
var mongoURI = envConfig.MONGODB_URI;
var openAIApiKey = envConfig.OPENAI_API_KEY;
var polygonApiKey = envConfig.POLYGON_API_KEY;
var polygonUrl = envConfig.POLYGON_BASE_URL;
var openAIWorkerUrl = envConfig.OPENAI_WORKER_URL;
var polygonWorkerUrl = envConfig.POLYGON_WORKER_URL;
var mistralServerUrl = envConfig.MISTRAL_SERVER_URL;
var mistralAiApiKey = envConfig.MISTRAL_AI_API_KEY;
var startDate = Dates.getDateNDaysAgo(3);
var endDate = Dates.getDateNDaysAgo(1);

// src/config/db.config.ts
var Db = class {
  connect() {
    try {
      mongoose.connect(mongoURI);
      mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
      });
      mongoose.connection.on("error", (err) => {
        console.error("Error connection failed:", err.message);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }
};

// src/errors/app.error.ts
var AppError = class extends Error {
  message;
  statusCode;
  errorCode;
  constructor(message, statusCode, errorCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/middlewares/errorHandler.middleware.ts
var errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "Bad Request",
      error: err.message || "Unknown error occurred",
      status: "error"
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.errorCode,
      status: "error"
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: err.message || "Unknown error occurred",
      status: "error"
    });
  }
};

// src/routes/stock-prediction.route.ts
import { Router } from "express";

// src/config/http.config.ts
var httpConfig = () => ({
  // Success responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  // Server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
});
var HTTP_STATUS = httpConfig();

// src/services/stock-prediction.service.ts
import axios from "axios";

// src/utils/messages.utils.ts
var messages = (data) => [
  {
    role: "system",
    content: "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell. Use the examples provided between ### to set the style your response."
  },
  {
    role: "user",
    content: `${data}
            ###
            OK baby, hold on tight! You are going to haate this! Over the past three days, Tesla (TSLA) shares have plummetted. The stock opened at $223.98 and closed at $202.11 on the third day, with some jumping around in the meantime. This is a great time to buy, baby! But not a great time to sell! But I'm not done! Apple (AAPL) stocks have gone stratospheric! This is a seriously hot stock right now. They opened at $166.38 and closed at $182.89 on day three. So all in all, I would hold on to Tesla shares tight if you already have them - they might bounce right back up and head to the stars! They are volatile stock, so expect the unexpected. For APPL stock, how much do you need the money? Sell now and take the profits or hang on and wait for more! If it were me, I would hang on because this stock is on fire right now!!! Apple are throwing a Wall Street party and y'all invited!
            ###
            Apple (AAPL) is the supernova in the stock sky \u2013 it shot up from $150.22 to a jaw-dropping $175.36 by the close of day three. We\u2019re talking about a stock that\u2019s hotter than a pepper sprout in a chilli cook-off, and it\u2019s showing no signs of cooling down! If you\u2019re sitting on AAPL stock, you might as well be sitting on the throne of Midas. Hold on to it, ride that rocket, and watch the fireworks, because this baby is just getting warmed up! Then there\u2019s Meta (META), the heartthrob with a penchant for drama. It winked at us with an opening of $142.50, but by the end of the thrill ride, it was at $135.90, leaving us a little lovesick. It\u2019s the wild horse of the stock corral, bucking and kicking, ready for a comeback. META is not for the weak-kneed So, sugar, what\u2019s it going to be? For AAPL, my advice is to stay on that gravy train. As for META, keep your spurs on and be ready for the rally.
            ###
            `
  }
];

// src/enums/error-code.enum.ts
var ErrorCode = {
  AUTH_EMAIL_ALREADY_EXISTS: "AUTH_EMAIL_ALREADY_EXISTS",
  AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
  AUTH_USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",
  AUTH_NOT_FOUND: "AUTH_NOT_FOUND",
  AUTH_TOO_MANY_ATTEMPTS: "AUTH_TOO_MANY_ATTEMPTS",
  AUTH_UNAUTHORIZED_ACCESS: "AUTH_UNAUTHORIZED_ACCESS",
  AUTH_TOKEN_NOT_FOUND: "AUTH_TOKEN_NOT_FOUND",
  // Access Control Errors
  ACCESS_UNAUTHORIZED: "ACCESS_UNAUTHORIZED",
  // Validation and Resource Errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  // System Errors
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
};

// src/errors/internal-server.error.ts
var InternalServerError = class extends AppError {
  constructor(message, statusCode, errorCode) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR
    );
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
};

// src/errors/bad-request.error.ts
var BadRequestExceptionError = class extends AppError {
  constructor(message, statusCode, errorCode) {
    super(
      message,
      HTTP_STATUS.BAD_REQUEST,
      errorCode || ErrorCode.VALIDATION_ERROR
    );
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
};

// src/services/stock-prediction.service.ts
var StockPredictionService = class {
  fetchStockData = async (param) => {
    const dates = {
      startDate: Dates.getDateNDaysAgo(3),
      endDate: Dates.getDateNDaysAgo(1)
    };
    try {
      const stockData = await Promise.all(
        param.tickersArr.map(async (ticker) => {
          const response = await axios.get(
            `${polygonWorkerUrl}?ticker=${ticker}&startDate=${dates.startDate}&endDate=${dates.endDate}`
          );
          if (!response.status) {
            throw new BadRequestExceptionError(
              "Error fetching stock data",
              HTTP_STATUS.BAD_REQUEST,
              ErrorCode.RESOURCE_NOT_FOUND
            );
          }
          const data2 = response.data;
          return data2;
        })
      );
      const data = await this.fetchReport(stockData);
      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error) {
        console.error("Error fetching stock data:", error.message);
        throw new InternalServerError(
          error.message,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          ErrorCode.INTERNAL_SERVER_ERROR
        );
      }
      throw error;
    }
  };
  fetchReport = async (stockData) => {
    try {
      const response = await axios.post(
        openAIWorkerUrl,
        JSON.stringify(messages(stockData)),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const status = response.status;
      if (status !== 200) {
        throw new BadRequestExceptionError(
          "Worker Error",
          HTTP_STATUS.BAD_REQUEST,
          ErrorCode.RESOURCE_NOT_FOUND
        );
      }
      const data = response.data;
      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  };
};

// src/controllers/stock-prediction.controller.ts
var StockPredictionController = class {
  stockPredictionService;
  constructor() {
    this.stockPredictionService = new StockPredictionService();
  }
  fetchStockData = async (req, res) => {
    try {
      const { tickersArr } = req.body;
      if (!Array.isArray(tickersArr) || tickersArr.length == 0) {
        throw new BadRequestExceptionError(
          "Invalid request parameters",
          HTTP_STATUS.BAD_REQUEST,
          ErrorCode.VALIDATION_ERROR
        );
      }
      const reportData = await this.stockPredictionService.fetchStockData({
        tickersArr
      });
      console.log(reportData);
      return res.status(HTTP_STATUS.OK).json({ message: "Stock Report fetched successfully", reportData });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      if (error instanceof Error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
  };
  //   try {
  //     const response = await axios.post(
  //       openAIWorkerUrl,
  //       JSON.stringify(messages(stockData)),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const status = response.status;
  //     if (status !== 200) {
  //       throw new BadRequestExceptionError(
  //         "Worker Error",
  //         HTTP_STATUS.BAD_REQUEST,
  //         ErrorCode.RESOURCE_NOT_FOUND
  //       );
  //     }
  //     const data = response.data;
  //     return data;
  //   } catch (error) {
  //     if (error instanceof AppError) {
  //       throw error;
  //     }
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //     throw error;
  //   }
  // };
};

// src/routes/stock-prediction.route.ts
var StockPredictionRoute = class {
  stockPredictionController;
  router;
  constructor() {
    this.router = Router();
    this.stockPredictionController = new StockPredictionController();
    this.routes();
  }
  routes() {
    this.router.post("/", this.stockPredictionController.fetchStockData);
  }
};
var stockPredictionRouter = new StockPredictionRoute().router;

// app.ts
var App = class {
  app;
  db;
  constructor() {
    this.app = express();
    this.db = new Db();
    this.initializeMiddleware();
    this.initializeRoutes();
  }
  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*"
      })
    );
  }
  initializeRoutes() {
    this.app.use("/api", stockPredictionRouter);
    this.app.use(errorHandler);
  }
  startServer() {
    this.db?.connect();
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} at ${hostName}:${port}`);
    });
  }
};
var appInstance = new App();
var app = appInstance.app;
if (import.meta.url === `file://${process.argv[1]}`) {
  appInstance.startServer();
}
var app_default = app;
export {
  app,
  app_default as default
};
