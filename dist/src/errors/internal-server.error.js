/** @format */
import { AppError } from "./app.error.ts";
import { HTTP_STATUS } from "../config/http.config.ts";
import { ErrorCode } from "../enums/error-code.enum.ts";
export class InternalServerError extends AppError {
    message;
    statusCode;
    errorCode;
    constructor(message, statusCode, errorCode) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
