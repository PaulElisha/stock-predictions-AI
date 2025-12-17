/** @format */

import { HTTP_STATUS } from "../config/http.config.js";
import { Request, Response } from "express";
import {
  StockPredictionService,
  StockPredictionServiceInstance,
} from "../services/stock-prediction.service.js";
import { ErrorCode } from "../enums/error-code.enum.js";
import { AppError } from "../errors/app.error.js";
import { BadRequestExceptionError } from "../errors/bad-request.error.js";

class StockPredictionController {
  private stockPredictionService: StockPredictionServiceInstance;
  constructor() {
    this.stockPredictionService = new StockPredictionService();
  }

  public fetchStockData = async (req: Request, res: Response): Promise<any> => {
    try {
      const { tickersArr } = req.body;
      // const tickersArr = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

      if (!Array.isArray(tickersArr) || tickersArr.length == 0) {
        throw new BadRequestExceptionError(
          "Invalid request parameters",
          HTTP_STATUS.BAD_REQUEST,
          ErrorCode.VALIDATION_ERROR
        );
      }

      const reportData = await this.stockPredictionService.fetchStockData({
        tickersArr,
      });
      console.log(reportData);

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Stock Report fetched successfully", reportData });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        return res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
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
}

export type StockPredictionControllerInstance = StockPredictionController;
export { StockPredictionController };
