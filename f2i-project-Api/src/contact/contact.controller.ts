import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitForm(@Body() contactDto: CreateContactDto) {
    return this.contactService.processContactForm(contactDto);
  }
}
