import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly saltRound = 10;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(`Email ${email} not found!`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Password is wrong!');
    }

    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }
}
