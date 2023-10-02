import { Module } from '@nestjs/common';
import { MailModule } from '../../frameworks/mail/mail.module';

@Module({
  imports: [MailModule],
  exports: [MailModule],
})
export class MailServicesModule {}
