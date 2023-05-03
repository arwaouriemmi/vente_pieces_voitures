import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
 
    await this.mailerService.sendMail({
      to: "onsouahchi@gmail.com",
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', 
      context: { 
        name: user.name
      },
    });
  }

}
