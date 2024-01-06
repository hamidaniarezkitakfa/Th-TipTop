import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private mailerService: MailerService,
  ) {}

  async processContactForm(contactDto: CreateContactDto) {
    await this.mailerService.sendMail({
      to: contactDto.email,
      from: 'essaidmadi@gmail.com',
      subject: 'Thank you for your contact request',
      text: `Message from ${contactDto.name}: ${contactDto.message}`,
      html: `<b>Message from ${contactDto.name}:</b> ${contactDto.message}`,
    });
    return { message: 'Form submitted successfully' };
  }
}
