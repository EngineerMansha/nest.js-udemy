import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    console.log(data);
    const request = context.switchToHttp().getRequest();
    console.log('userID', request.session.userId);
    return request.currentUser;
  },
);
