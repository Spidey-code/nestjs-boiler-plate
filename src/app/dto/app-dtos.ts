import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiResponse } from '../../dto';
import { CONSTANT } from 'src/constants/constants';

export class GetResponse {
  @ApiProperty({ example: CONSTANT.SWAGGER.EXAMPLE.RESPONSE })
  @IsString()
  @IsNotEmpty()
  response: string;
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
