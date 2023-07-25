import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQuery {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageNumber?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;
}

export class PaginationDto extends PaginationQuery {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  offset: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  limit: number;
}

export class PaginationResponse {
  @ApiProperty({ type: PaginationQuery })
  pagination: PaginationQuery;
}
