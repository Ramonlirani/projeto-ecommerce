import { Module } from '@nestjs/common';
import { IMailService } from '@core/abstracts/mail-services.abstract';
import { SendgridService } from './sendgrid/sendgrid.service';

@Module({
  providers: [
    {
      provide: IMailService,
      useClass: SendgridService,
    },
  ],
  exports: [IMailService],
})
export class MailModule {}
