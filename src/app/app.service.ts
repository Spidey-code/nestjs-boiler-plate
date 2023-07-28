import { Injectable } from '@nestjs/common';
import { CONSTANT } from '../constants/constants';
import { ConfigService } from '@nestjs/config';
import { configData } from 'src/config';
import { GetHealthCheckResponse, PostBodyDto } from './dto/app-dtos';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  config: any = configData(this.configService);

  getHealthCheck(): GetHealthCheckResponse {
    return {
      response: `${CONSTANT.PUBLIC.HEALTHCHECK} at port: ${this.config.port}`,
    };
  }
  postMethodCheck(body: PostBodyDto): any {
    return {
      response: body,
    };
  }
}
