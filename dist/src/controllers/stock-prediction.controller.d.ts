/** @format */
import { Request, Response } from "express";
declare class StockPredictionController {
    private stockPredictionService;
    constructor();
    fetchStockData: (req: Request, res: Response) => Promise<any>;
}
export type StockPredictionControllerInstance = StockPredictionController;
export { StockPredictionController };
