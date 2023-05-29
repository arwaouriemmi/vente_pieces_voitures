import { Injectable, Provider } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Providers } from 'src/providers/entities/providers.entity';


@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Providers) {
    console.log(user.email);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre compte est désormais activé',
      template: './confirmation', 
      context: { 
        name: user.name
      },
    });
    console.log("mail sent");
  }

  async sendUserDeactivation(user: Providers) {
    console.log(user.email);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre compte est désormais bloqué',
      template: './blocked',
      context: {
        name: user.name
      },
    });
  }
}