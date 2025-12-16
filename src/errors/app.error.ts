/** @format */

import { HttpStatusCodeType } from "../config/http.config.ts";
import { ErrorCodeType } from "../enums/error-code.enum.ts";

export class AppError extends Error {
  public message: string;
  public statusCode: HttpStatusCodeType;
  public errorCode?: ErrorCodeType;

  constructor(
    message: string,
    statusCode: HttpStatusCodeType,
    errorCode?: ErrorCodeType
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
