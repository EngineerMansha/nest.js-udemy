import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/update-user.dto';
import {
  MInterceptor,
  MyInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
  constructor(private _user: UsersService) {}
  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    return this._user.create(body.email, body.password);
  }
  @Get()
  //Custom interceptor
  @MInterceptor(UserDto)
  getAll() {
    return this._user.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = await this._user.findOne1(parseInt(id));
    if (!user) {
      throw new NotFoundException('User Not Found ');
    }
    return user;
  }
  @Get()
  getAllUser(@Query('email') email: string) {
    return this._user.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this._user.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this._user.update(parseInt(id), body);
  }
}
