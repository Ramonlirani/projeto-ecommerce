import { Public } from '@auth-decorators/public.decorator';
import { env } from '@env';
import { Controller, Get, Param } from '@nestjs/common';

@Public()
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return 'ok';
  }

  @Get('/novais/variable/:name')
  variable(@Param('name') name: string) {
    return env[name];
  }
}
