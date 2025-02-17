import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';

import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exceptionFilter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class App {
	server: Server;
	app: Express;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server is running on port: ${this.port}`);
		});
	}
}
