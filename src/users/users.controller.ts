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
  UseGuards,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/update-user.dto';
import {
  MInterceptor,
  MyInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptor/current-user-intercepter';
import { UserEntity } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('auth')
// for One Controller we use this method
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private _user: UsersService, private _auth: AuthService) {}
  @Post('/signup')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    // return this._user.create(body.email, body.password);
    const user = await this._auth.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() Body: CreateUserDto, @Session() session: any) {
    const user = this._auth.signin(Body.email, Body.password);
    session.userId = (await user).id;
    return user;
  }

  // @Get('/who')
  // who(@Session() Session: any) {
  //   return this._user.findOne1(Session.userId);
  // }
  @UseGuards(AuthGuard)
  @Get('/who')
  who(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('/signout')
  signout(@Session() Session: any) {
    Session.userId = null;
    return {
      message: 'logout successfully',
    };
  }

  //Custom interceptor
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Get()
  getAllUser(@Query('email') email: string) {
    return this._user.find(email);
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this._user.remove(parseInt(id));
  }
  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this._user.update(parseInt(id), body);
  }
}
