import sgMail from '@sendgrid/mail';
import fs from 'node:fs';
import handlebars from 'handlebars';
import {
  IMailService,
  IMailServiceProps,
} from '@core/abstracts/mail-services.abstract';
import { env } from '@env';

export class SendgridService implements IMailService {
  async sendEmail({
    to,
    subject,
    variables,
    path,
  }: IMailServiceProps): Promise<boolean> {
    try {
      sgMail.setApiKey(env.SENDGRID_API_KEY);

      const templateFileContent = fs.readFileSync(path).toString('utf-8');

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse(variables);

      const msg = {
        to, // Change to your recipient
        from: 'ramonliranidev@gmail.com', // Change to your verified sender
        subject,
        html: templateHTML,
      };

      const response = await sgMail.send(msg);

      if (response[0].statusCode == 202) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
