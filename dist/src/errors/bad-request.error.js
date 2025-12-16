/** @format */
import { ErrorCode } from "../enums/error-code.enum.ts";
import { AppError } from "./app.error.ts";
import { HTTP_STATUS } from "../config/http.config.ts";
export class BadRequestExceptionError extends AppError {
    message;
    statusCode;
    errorCode;
    constructor(message, statusCode, errorCode) {
        super(message, HTTP_STATUS.BAD_REQUEST, errorCode || ErrorCode.VALIDATION_ERROR);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
