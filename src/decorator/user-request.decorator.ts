import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserRequest = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { name, picture, user_id, email, phone_number, uid } = request.user;

    return {
      name,
      picture,
      user_id,
      email,
      phone: phone_number,
      uid,
    };
  },
);
