import { Container, ContainerModule, interfaces } from "inversify";

import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exceptionFilter";
import { IExceptionFilter } from "./errors/exceptionFilter.interface";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { App } from "./app";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return {
    app,
    appContainer,
  };
}

export const { app, appContainer } = bootstrap();
