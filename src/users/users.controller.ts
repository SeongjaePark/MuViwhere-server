import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let { password, ...user } = await this.usersService.findOne(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('hit!');
    return await this.usersService.create(createUserDto);
  }
}
