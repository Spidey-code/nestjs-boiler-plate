import { ApiProperty } from '@nestjs/swagger';
import { CONSTANT } from '../constants/constants';
import { MESSAGES } from '../constants/messages';

export class ApiResponse {
  @ApiProperty({ example: true })
  success: boolean;
}

class ErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: MESSAGES.ERROR.DEFAULT })
  message: string;
}

export class Api400ErrorResponse extends ErrorResponse {
  @ApiProperty({ example: MESSAGES.ERROR.BAD_REQUEST })
  error: string;

  @ApiProperty({ example: 400 })
  error_code: number;
}

export class Api401ErrorResponse extends ErrorResponse {
  @ApiProperty({ example: MESSAGES.ERROR.UNAUTHORIZED })
  error: string;

  @ApiProperty({ example: 401 })
  error_code: number;
}

export class Api403ErrorResponse extends ErrorResponse {
  @ApiProperty({ example: MESSAGES.ERROR.FORBIDDEN })
  error: string;

  @ApiProperty({ example: 403 })
  error_code: number;
}

export class Api404ErrorResponse extends ErrorResponse {
  @ApiProperty({ example: MESSAGES.ERROR.NOT_FOUND })
  error: string;
  @ApiProperty({ example: 404 })
  error_code: number;
}

export class ApiErrorResponse extends ErrorResponse {
  @ApiProperty({ example: MESSAGES.ERROR.SERVER_ERROR })
  error: string;

  @ApiProperty({ example: 500 })
  error_code: number;
}

export class ApiStatusOkResponse extends ApiResponse {
  @ApiProperty({ example: MESSAGES.SUCCESS.DEFAULT })
  message: string;

  @ApiProperty({ example: CONSTANT.PUBLIC.STATUS })
  data: string;
}
