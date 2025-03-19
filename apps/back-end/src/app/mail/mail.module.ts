import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_TRANSPORT_HOST'),
          port: configService.get<number>('MAIL_TRANSPORT_PORT', 465),
          secure: true,
          auth: {
            user: configService.get<string>('GOOGLE_MAIL'),
            pass: configService.get<string>('GOOGLE_APP_PASSWORD'),
          },
        },
        defaults: {
          from: `"TYME" <${configService.get<string>('GOOGLE_MAIL')}>`,
        },
        preview: true,
        template: {
          dir: __dirname + '/assets/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
