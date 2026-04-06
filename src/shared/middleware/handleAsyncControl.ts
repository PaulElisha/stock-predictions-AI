/** @format */

import type { NextFunction, Request, Response } from "express";
import type { HandleAsyncControl } from "@type/types.js";

const handleAsyncControl =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    controller: HandleAsyncControl<P, ResBody, ReqBody, ReqQuery>,
  ) =>
  (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };

export default handleAsyncControl;
