import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiResponse } from '../../dto';
import { CONSTANT } from 'src/constants/constants';
import { MESSAGES } from 'src/constants/messages';

export class GetHealthCheckResponse {
  @ApiProperty({ example: CONSTANT.SWAGGER.EXAMPLE.RESPONSE })
  @IsString()
  @IsNotEmpty()
  response: string;
}

export class GetResponse {
  @ApiProperty({ type: GetHealthCheckResponse })
  response: GetHealthCheckResponse;

  @ApiProperty({ example: MESSAGES.SUCCESS.DEFAULT })
  message: string;
}

export class PostBodyDto {
  @ApiProperty({ example: CONSTANT.SWAGGER.EXAMPLE.USERNAME })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: CONSTANT.SWAGGER.EXAMPLE.AGE })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
export class PostBodyResponse {
  @ApiProperty({ example: MESSAGES.SUCCESS.DEFAULT })
  message: string;

  @ApiProperty({ type: PostBodyDto })
  response: PostBodyDto;
}
