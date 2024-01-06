import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, Ticket]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'essaidmadi@gmail.com',
            clientId: process.env.GOOGLE_CLIENT_ID_Mail,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_Mail,
            GOOGLE_RefreshToken_Mail: process.env.GOOGLE_CLIENT_ID_Mail,
          },
        },
        defaults: {
          from: 'tiptop@gmail.com',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
