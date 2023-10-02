import { Injectable } from '@nestjs/common';

import { CreateContactDto } from '@core/dtos/contact.dto';
import { getEmailTemplatePath } from '@helpers/getEmailTemplatePath';
import { IMailService } from '@core/abstracts/mail-services.abstract';
import { genericError } from '@helpers/errors';

@Injectable()
export class ContactUseCases {
  constructor(private mailService: IMailService) {}

  async execute(createContactDto: CreateContactDto): Promise<void> {
    try {
      const templatePath = getEmailTemplatePath('contact-us.hbs');

      await this.mailService.sendEmail({
        to: 'recordar@recordar.art.br',
        subject: 'Contato via site',
        variables: {
          name: createContactDto.name,
          email: createContactDto.email,
          phoneNumber: createContactDto.phoneNumber,
          message: createContactDto.message,
        },
        path: templatePath,
      });
    } catch (error) {
      throw genericError;
    }
  }
}
