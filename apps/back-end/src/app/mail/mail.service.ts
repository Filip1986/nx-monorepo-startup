import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly i18n: I18nService
  ) {}

  async sendResetPasswordEmail(
    email: string,
    username: string,
    resetLink: string
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: 'reset-password',
      context: {
        username,
        resetLink,
      },
    });
  }

  async sendConfirmationEmail(
    email: string,
    username: string,
    confirmationLink: string,
    language: string
  ) {
    const template = `confirmation-email-${language}.hbs`;
    const subject = this.i18n.t('test.EMAILS.CONFIRMATION_EMAIL.SUBJECT', {
      lang: language,
    });

    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: {
        email,
        username,
        confirmationLink,
        language,
      },
    });
  }
}
