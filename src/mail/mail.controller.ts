import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('send-mail')
  async sendMail(): Promise<string> {
    await this.mailService.sendEmail(
      'isaac.fidler@bx.tech',
      'Hello from NestJS and Mailgun',
      'This is a test email sent using Mailgun and NestJS.',
    );

    return 'Email sent.';
  }
}
