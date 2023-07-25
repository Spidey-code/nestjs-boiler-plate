// changed env varibles according to the server. Don't change
// ex: for dev: DEV_PORT
// ex: for prod: PROD_PORT

import { ConfigService } from '@nestjs/config';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export const configData = (configService: ConfigService) => ({
  port: configService.get<string>('PORT'),
});

class RequiredVariables {
  @IsString()
  @IsNotEmpty()
  @Expose()
  PORT: string;
}

export function validate(config: Record<string, unknown>) {
  let updatedConfig = config;
  const nodeEnv = process.env.NODE_ENV?.trim();
  if (nodeEnv) {
    const prefix = `${nodeEnv.toUpperCase()}_`;
    updatedConfig = Object.entries(config).reduce((acc, [key, value]) => {
      const newKey = key.startsWith(prefix) ? key.replace(prefix, '') : key;
      acc[newKey] = value;
      return acc;
    }, {});
  }

  const validatedConfig = plainToInstance(RequiredVariables, updatedConfig, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    //  Gather all the errors and throw it
    const issues: string[] = errors.map((error) => {
      const keys = Object.keys(error.constraints);
      return error.constraints[keys[0]];
    });

    issues.push('Invalid .env config');

    throw issues.join('\n');
  }

  return validatedConfig;
}
