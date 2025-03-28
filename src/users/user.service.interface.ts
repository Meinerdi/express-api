import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserRegisterDto) => Promise<boolean>;
}
