import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { HttpModule } from './http/http.module';
import { AuthModule } from './frameworks/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
  ],
})
export class AppModule {}
