/** @format */
import type { NextFunction, Request, Response } from "express";
export type HandleAsyncControl<P = any, ResBody = any, ReqBody = any, ReqQuery = any> = (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => Promise<Response>;
export declare const handleAsyncControl: <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(controller: HandleAsyncControl<P, ResBody, ReqBody, ReqQuery>) => (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
