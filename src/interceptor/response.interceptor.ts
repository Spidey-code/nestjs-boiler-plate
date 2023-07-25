import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, of } from 'rxjs';
import { MESSAGES } from 'src/constants/messages';

export interface ValidResponse<T> {
  success: Boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: Boolean;
  message: string;
  error: string;
  error_code: number;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ValidResponse<T> | ErrorResponse>
{
  private logger = new Logger();

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ValidResponse<T> | ErrorResponse> {
    const request = context.switchToHttp().getRequest();

    const { pageNumber, pageSize } = request.query;
    const page = pageNumber ? parseInt(pageNumber, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;

    this.logger.log(request.originalUrl, `API ${request.method}`);

    return next.handle().pipe(
      map((data: any) => {
        const res = data.response;
        const message = data.message;

        if (res === null || res === undefined || typeof res === undefined)
          throw new BadRequestException(MESSAGES.ERROR.SERVER_ERROR);

        let result: any = res;
        if (Array.isArray(res))
          result = {
            data: res,
            pagination: {
              pageNumber: page,
              pageSize: res.length,
            },
          };

        const validResponse: ValidResponse<T> = {
          success: true,
          message: message || MESSAGES.SUCCESS.DEFAULT,
          data: result,
        };

        return validResponse;
      }),
      catchError((error: any) => {
        if (Array.isArray(error?.response?.message))
          error.response.message = error.response.message?.join(', ');

        context.switchToHttp().getResponse().statusCode =
          error.response?.statusCode ?? 500;

        //  Handled Exception
        if (error.response) {
          this.logger.error(
            error.response.message,
            `${request.method} ${request.originalUrl}`,
          );

          return of({
            success: false,
            message: error.response.message,
            error_code: error.response.statusCode,
            error: error.response.error,
          });
        }

        //  Unhandled Exception
        this.logger.error(error, error.stack);
        const errorResponse: ErrorResponse = {
          success: false,
          message: error.message,
          error_code: 500,
          error: MESSAGES.ERROR.SERVER_ERROR,
        };

        return of(errorResponse);
      }),
    );
  }
}
