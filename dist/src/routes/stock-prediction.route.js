/** @format */
import { Router } from "express";
import { StockPredictionController, } from "../controllers/stock-prediction.controller.ts";
class StockPredictionRoute {
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
}
export const stockPredictionRouter = new StockPredictionRoute().router;
