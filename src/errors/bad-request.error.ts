/** @format */

import { ErrorCode, ErrorCodeType } from "../enums/error-code.enum.js";
import { AppError } from "./app.error.js";
import { HttpStatusCodeType } from "../config/http.config.js";
import { HTTP_STATUS } from "../config/http.config.js";

export class BadRequestExceptionError extends AppError {
  constructor(
    public message: string,
    public statusCode: HttpStatusCodeType,
    public errorCode?: ErrorCodeType
  ) {
    super(
      message,
      HTTP_STATUS.BAD_REQUEST,
      errorCode || ErrorCode.VALIDATION_ERROR
    );
  }
}
