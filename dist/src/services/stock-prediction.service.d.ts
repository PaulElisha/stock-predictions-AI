/** @format */
import type { StockDataParam } from "../types/paramters/parameters.types.ts";
declare class StockPredictionService {
    fetchStockData: (param: StockDataParam) => Promise<any>;
    private fetchReport;
}
export type StockPredictionServiceInstance = StockPredictionService;
export { StockPredictionService };
