import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateContactDto } from '@core/dtos/contact.dto';
import { ContactUseCases } from '@use-cases/contact/contact.use-case';
import { Public } from '@auth-decorators/public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private contactUseCases: ContactUseCases) {}
  @Public()
  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Res() response: Response,
  ) {
    await this.contactUseCases.execute(createContactDto);
    return response.status(201).json({
      error: false,
    });
  }
}
