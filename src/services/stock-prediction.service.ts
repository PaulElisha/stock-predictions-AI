/** @format */

import axios from "axios";
import { openAIWorkerUrl, polygonWorkerUrl } from "../constants/constants.ts";
import type { StockDataParam } from "../types/paramters/parameters.types.ts";
import { messages } from "../utils/messages.utils.ts";
import { InternalServerError } from "../errors/internal-server.error.ts";
import { HTTP_STATUS } from "../config/http.config.ts";
import { ErrorCode } from "../enums/error-code.enum.ts";
import { BadRequestExceptionError } from "../errors/bad-request.error.ts";
import { AppError } from "../errors/app.error.ts";
import { Dates } from "../utils/Dates.ts";

class StockPredictionService {
  public fetchStockData = async (param: StockDataParam): Promise<any> => {
    const dates = {
      startDate: Dates.getDateNDaysAgo(3),
      endDate: Dates.getDateNDaysAgo(1),
    };

    try {
      const stockData = await Promise.all(
        param.tickersArr.map(async (ticker: string) => {
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
          const data = response.data as any;
          return data;
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
}

export type StockPredictionServiceInstance = StockPredictionService;
export { StockPredictionService };
