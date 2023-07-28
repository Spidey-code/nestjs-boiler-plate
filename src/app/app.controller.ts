import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetResponse, PostBodyDto, PostBodyResponse } from './dto/app-dtos';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CONSTANT } from 'src/constants/constants';
import { CustomSwaggerResponse } from 'src/decorator';
import { MESSAGES } from 'src/constants/messages';

@ApiTags(CONSTANT.SWAGGER.TAGS.HEALTHCHECK)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiConsumes('application/json')
  @CustomSwaggerResponse({ type: GetResponse })
  getHealthCheck(): GetResponse {
    const response = this.appService.getHealthCheck();
    return {
      response,
      message: MESSAGES.SUCCESS.DEFAULT,
    };
  }

  @Post()
  @ApiConsumes('application/json')
  @CustomSwaggerResponse({ type: PostBodyResponse })
  postMethodCheck(@Body() body: PostBodyDto): PostBodyResponse {
    const response = this.appService.postMethodCheck(body);
    return {
      response,
      message: MESSAGES.SUCCESS.DEFAULT,
    };
  }
}
