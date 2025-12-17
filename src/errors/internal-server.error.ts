/** @format */

import { AppError } from "./app.error.js";
import { ErrorCodeType } from "../enums/error-code.enum.js";
import { HttpStatusCodeType } from "../config/http.config.js";
import { HTTP_STATUS } from "../config/http.config.js";
import { ErrorCode } from "../enums/error-code.enum.js";

export class InternalServerError extends AppError {
  constructor(
    public message: string,
    public statusCode: HttpStatusCodeType,
    public errorCode?: ErrorCodeType
  ) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}
