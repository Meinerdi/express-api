import { inject, injectable } from 'inversify';

import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '../generated/prisma';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const isUserExist = await this.usersRepository.find(email);
		if (isUserExist) {
			return null;
		}
		return await this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);

		return await newUser.comparePasswords(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		const userData = this.usersRepository.find(email);

		return userData;
	}
}
