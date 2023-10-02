import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { CaslModule } from '../../services/casl/casl.module';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from './permission.guard';

@Module({
  imports: [CaslModule, DatabaseModule, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PermissionsGuard,
  ],
  exports: [PermissionsGuard],
})
export class AuthModule {}
