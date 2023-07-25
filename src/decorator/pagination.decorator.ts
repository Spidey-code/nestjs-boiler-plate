import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export const Pagination = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { pageNumber, pageSize } = request.query;

    const page = pageNumber ? parseInt(pageNumber, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;

    const offset = (page - 1) * size;
    const limit = size;

    const paginate: PaginationDto = {
      pageNumber: page,
      pageSize: size,
      offset,
      limit,
    };

    return paginate;
  },
);
