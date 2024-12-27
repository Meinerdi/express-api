import { Router } from "express";
import { LoggerService } from "../logger/logger.service";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  protected bindRoutes(routes: any) {
    this._router.get("path", () => {});
  }
}
