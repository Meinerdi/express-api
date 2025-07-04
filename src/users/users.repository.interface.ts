import { User } from './user.entity';
import { UserModel } from '../generated/prisma';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
