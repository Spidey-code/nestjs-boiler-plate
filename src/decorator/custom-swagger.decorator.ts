import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  Api400ErrorResponse,
  Api401ErrorResponse,
  Api403ErrorResponse,
  Api404ErrorResponse,
  ApiErrorResponse,
  PaginationQuery,
} from '../dto';

class Header {
  name: string;
  required: boolean;
  description?: string;
}

export function CustomSwaggerResponse(options?: {
  type?: Type<unknown> | Function | [Function] | string;
  methodType?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
  summary?: string;
  isAuthorizedRoute?: Boolean;
  isForbiddenRoute?: Boolean;
  isFetchResource?: Boolean;
  isPagination?: Boolean;
  headers?: Header[];
}) {
  const swaggerDecorators = [];

  if (!options || !options.hasOwnProperty('isAuthorizedRoute'))
    options = { ...options, isAuthorizedRoute: true };

  if (options?.description || options?.summary)
    swaggerDecorators.push(
      ApiOperation({
        description: options?.description,
        summary: options?.summary,
      }),
    );

  if (options?.type && options?.methodType !== 'POST')
    swaggerDecorators.push(ApiOkResponse({ type: options.type }));
  else if (options?.type && options?.methodType === 'POST')
    swaggerDecorators.push(ApiCreatedResponse({ type: options.type }));

  if (options?.isPagination)
    swaggerDecorators.push(ApiQuery({ type: PaginationQuery }));

  swaggerDecorators.push(ApiBadRequestResponse({ type: Api400ErrorResponse }));

  if (options?.isAuthorizedRoute) {
    swaggerDecorators.push(ApiBearerAuth());
    swaggerDecorators.push(
      ApiUnauthorizedResponse({ type: Api401ErrorResponse }),
    );
  }
  if (options?.isForbiddenRoute)
    swaggerDecorators.push(ApiForbiddenResponse({ type: Api403ErrorResponse }));
  if (options?.isFetchResource && options?.methodType === 'GET')
    swaggerDecorators.push(ApiNotFoundResponse({ type: Api404ErrorResponse }));

  if (options?.headers)
    options.headers.forEach(({ name, required, description }) =>
      swaggerDecorators.push(ApiHeader({ name, required, description })),
    );

  swaggerDecorators.push(
    ApiResponse({
      status: 500,
      type: ApiErrorResponse,
    }),
  );

  return applyDecorators(...swaggerDecorators);
}
