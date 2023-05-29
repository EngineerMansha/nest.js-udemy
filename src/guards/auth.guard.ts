import { CanActivate, ExecutionContext } from '@nestjs/common';
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('req', request.session);
    return request.session.userId;
  }
}
