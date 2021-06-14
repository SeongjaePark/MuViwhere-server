import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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
    user.password = await bcrypt.hash(createUserDto.password, 10);

    let { password, ...userInfo } = await this.usersRepository.save(user);

    return userInfo;
  }
}
