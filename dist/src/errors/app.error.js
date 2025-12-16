/** @format */
export class AppError extends Error {
    message;
    statusCode;
    errorCode;
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
