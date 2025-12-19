/** @format */

import axios from "axios";
import { openAIWorkerUrl, polygonWorkerUrl } from "../constants/constants.js";
import type { StockDataParam } from "../types/paramters/parameters.types.js";
import { messages } from "../utils/messages.utils.js";
import { HTTP_STATUS } from "../config/http.config.js";
import { ErrorCode } from "../enums/error-code.enum.js";
import { BadRequestExceptionError } from "../errors/bad-request.error.js";
import { AppError } from "../errors/app.error.js";

class StockPredictionService {
  public fetchStockData = async (param: StockDataParam): Promise<any> => {
    const { tickersArr, dates } = param;
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    try {
      const stockData = await Promise.all(
        tickersArr.map(async (ticker: string) => {
          const response = await axios.get(
            `${polygonWorkerUrl}?ticker=${ticker}&startDate=${startDate}&endDate=${endDate}`
          );

          if (!response.status) {
            throw new BadRequestExceptionError(
              "Polygon Worker: Worker Error",
              HTTP_STATUS.BAD_REQUEST,
              ErrorCode.RESOURCE_NOT_FOUND
            );
          }
          const data = response.data as any;
          return data;
        })
      );

      console.log("Stock data", stockData);

      try {
        const data = await this.fetchReport(stockData);
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
    } catch (error) {
      if (error instanceof AppError) {
        console.log(`${error.message}`);
        throw error;
      }

      if (error instanceof Error) {
        console.log(`${error.message}`);
        throw new Error(error.message);
      }

      throw error;
    }
  };

  private fetchReport = async (stockData: any): Promise<any> => {
    try {
      const response = await axios.post(
        openAIWorkerUrl,
        JSON.stringify(messages(stockData)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const status = response.status;
      if (status !== 200) {
        throw new BadRequestExceptionError(
          "Mistral Worker: Worker Error",
          HTTP_STATUS.BAD_REQUEST,
          ErrorCode.RESOURCE_NOT_FOUND
        );
      }
      const data = response.data as any;
      return data;
    } catch (error) {
      if (error instanceof AppError) {
        console.error(`${error.message}`);
        throw error;
      }

      if (error instanceof Error) {
        console.error(`${error.message}`);
        throw new Error(error.message);
      }

      throw error;
    }
  };
}

export type StockPredictionServiceInstance = StockPredictionService;
export { StockPredictionService };
