import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class MailService {
  private mailgun: Mailgun.Mailgun;

  constructor(configService: ConfigService) {
    this.mailgun = new Mailgun({
      apiKey: configService.get<string>('MAILGUN_API_KEY'),
      domain: configService.get<string>('MAILGUN_DOMAIN'),
    });
  }
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const data: Mailgun.messages.SendData = {
      from: 'isaac.fidler@bx.tech',
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.mailgun.messages().send(data);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
