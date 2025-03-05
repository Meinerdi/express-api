import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from './app';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exceptionFilter';
import { UserService } from './users/user.service';
import { IExceptionFilter } from './errors/exceptionFilter.interface';
import { IUserService } from './users/user.service.interface';
import { ILogger } from './logger/logger.interface';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
	bind<IUserService>(TYPES.UserService).to(UserService);
});

function bootstrap(): IBootstrapReturn {
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
