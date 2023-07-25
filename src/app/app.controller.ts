import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetResponse, PostBodyDto } from './dto/app-dtos';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CONSTANT } from 'src/constants/constants';
import { CustomSwaggerResponse } from 'src/decorator';

@ApiTags(CONSTANT.SWAGGER.TAGS.HEALTHCHECK)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiConsumes('application/json')
  @CustomSwaggerResponse({ type: GetResponse })
  getHealthCheck(): GetResponse {
    return this.appService.getHealthCheck();
  }

  @Post()
  @ApiConsumes('application/json')
  @CustomSwaggerResponse({ type: PostBodyDto })
  postMethodCheck(@Body() body: PostBodyDto): PostBodyDto {
    return this.appService.postMethodCheck(body);
  }
}
