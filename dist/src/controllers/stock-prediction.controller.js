/** @format */
import { HTTP_STATUS } from "../config/http.config.ts";
import { StockPredictionService, } from "../services/stock-prediction.service.ts";
import { ErrorCode } from "../enums/error-code.enum.ts";
import { AppError } from "../errors/app.error.ts";
import { BadRequestExceptionError } from "../errors/bad-request.error.ts";
class StockPredictionController {
    stockPredictionService;
    constructor() {
        this.stockPredictionService = new StockPredictionService();
    }
    fetchStockData = async (req, res) => {
        try {
            const { tickersArr } = req.body;
            // const tickersArr = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
            if (!Array.isArray(tickersArr) || tickersArr.length == 0) {
                throw new BadRequestExceptionError("Invalid request parameters", HTTP_STATUS.BAD_REQUEST, ErrorCode.VALIDATION_ERROR);
            }
            const reportData = await this.stockPredictionService.fetchStockData({
                tickersArr,
            });
            console.log(reportData);
            return res
                .status(HTTP_STATUS.OK)
                .json({ message: "Stock Report fetched successfully", reportData });
        }
        catch (error) {
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
}
export { StockPredictionController };
