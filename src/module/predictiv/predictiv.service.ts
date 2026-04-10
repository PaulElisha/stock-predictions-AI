/** @format */

import axios from "axios";
import FA from "fasy";

import HttpStatus from "@config/http.config.js";
import ErrorCode from "@/src/shared/enum/error-code.js";
import BadRequestExceptionError from "@/src/shared/error/bad-request.js";
import Envconfig from "@/env.js";
import Messages from "@/src/shared/util/Messages.js";

import type { StockDataParam, Result } from "@type/types.js";
import AppError from "@/src/shared/error/app-error";

class PredictivService {
  public generateStockReport = async (param: StockDataParam): Result<any, AppError> => {
    const { tickersArr, dates } = param;
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    try {
      const awaitingReport = await FA.serial.pipe([
        async () => {
          return await FA.concurrent.map(async (ticker: string) => {
            const response = await axios.get(
              `${Envconfig.POLYGON_WORKER_URL}?ticker=${ticker}&startDate=${startDate}&endDate=${endDate}`,
            );

            if (!response.status) {
              return [
                null,
                new BadRequestExceptionError(
                  "Polygon Worker: Worker Error",
                  HttpStatus.BAD_REQUEST,
                  ErrorCode.RESOURCE_NOT_FOUND,
                ),
              ];
            }

            return <any>response.data;
          }, tickersArr);
        },
        async (stockData: any[]) => {
          console.log("Stock data", stockData);

          const [data, error] = await this.fetchReport(stockData);

          if (error) return [null, error];

          return [data, null];
        },
      ]);

      const [data, error] = await awaitingReport();

      if (error) return [null, <AppError>error];
      return [data, null];
    } catch (error) {
      return [null, <AppError>error];
    }
  };

  private fetchReport = async (stockData: any[]): Result<any, AppError> => {
    try {
      const response = await axios.post(Envconfig.OPENAI_WORKER_URL, Messages(stockData), {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "stream",
      });

      if (response.status !== 200) {
        return [
          null,
          new BadRequestExceptionError(
            "Mistral Worker: Worker Error",
            HttpStatus.BAD_REQUEST,
            ErrorCode.RESOURCE_NOT_FOUND,
          ),
        ];
      }
      console.log("Response data", response.data);
      return [response.data, null];
    } catch (error) {
      return [null, <AppError>error];
    }
  };
}

export default new PredictivService();
