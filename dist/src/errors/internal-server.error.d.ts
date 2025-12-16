/** @format */
import { AppError } from "./app.error.ts";
import { ErrorCodeType } from "../enums/error-code.enum.ts";
import { HttpStatusCodeType } from "../config/http.config.ts";
export declare class InternalServerError extends AppError {
    message: string;
    statusCode: HttpStatusCodeType;
    errorCode?: ErrorCodeType | undefined;
    constructor(message: string, statusCode: HttpStatusCodeType, errorCode?: ErrorCodeType | undefined);
}
