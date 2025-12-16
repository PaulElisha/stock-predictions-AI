/** @format */
import { HttpStatusCodeType } from "../config/http.config.ts";
import { ErrorCodeType } from "../enums/error-code.enum.ts";
export declare class AppError extends Error {
    message: string;
    statusCode: HttpStatusCodeType;
    errorCode?: ErrorCodeType;
    constructor(message: string, statusCode: HttpStatusCodeType, errorCode?: ErrorCodeType);
}
