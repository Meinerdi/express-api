import { NextFunction, Request, Response } from "express";

export class ExceptionFilter {
  catch(err: Error, req: Request, res: Response, next: NextFunction) {}
}
