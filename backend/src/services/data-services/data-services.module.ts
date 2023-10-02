import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../frameworks/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class DataServicesModule {}
