import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
