import { Response } from 'express';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigurationUseCases } from '@use-cases/configuration/configuration.use-case';
import { Public } from '@auth-decorators/public.decorator';

@Controller('configurations')
export class ConfigurationController {
  constructor(private configurationUseCase: ConfigurationUseCases) {}
  @Post()
  async save(@Body() createConfigurationDto: any, @Res() response: Response) {
    await this.configurationUseCase.save(createConfigurationDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Public()
  @Post('/filter')
  async filter(@Body() keys: string[], @Res() response: Response) {
    const configurations = await this.configurationUseCase.filter(keys);

    return response.status(201).json({
      error: false,
      configurations,
    });
  }

  @Public()
  @Get('/policy-and-terms')
  async policies(@Res() response: Response) {
    const policyAndTerms = await this.configurationUseCase.filter([
      'privacyPoliciesAndTerms',
    ]);

    return response.status(201).json({
      error: false,
      policyAndTerms,
    });
  }

  @Public()
  @Get('/company')
  async company(@Res() response: Response) {
    const configuration =
      await this.configurationUseCase.loadCompanyConfiguration();

    return response.status(201).json({
      error: false,
      configuration,
    });
  }
}
