import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async findOne(id: number) {
    return await this.usersRepository.findOne({ id: id });
  }

  public async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException(['email is already taken']);
    }

    const user = new User();
    user.email = createUserDto.email;
    user.password = await this.authService.hashPassword(createUserDto.password);

    return await this.usersRepository.save(user);
  }
}
