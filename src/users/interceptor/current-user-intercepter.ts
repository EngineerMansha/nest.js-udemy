import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.Session;
    if (userId) {
      const user = await this.userService.findOne1(userId);
      console.log('user........', user);
      request.currentUser = user;
    }
    return handler.handle();
  }
}