import { Injectable } from '@nestjs/common';
const mailchimp = require('@mailchimp/mailchimp_marketing');

@Injectable()
export class MailchimpService {
  constructor() {
    mailchimp.setConfig({
      apiKey: process.env.API_MAILCHIMP,
      server: process.env.SERVER_MAILCHIMP,
    });
  }

  async addSubscriber(email: string): Promise<any> {
    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MEMBER_ID,
        {
          email_address: email,
          status: 'subscribed',
        },
      );
      return response;
    } catch (error) {
      console.error('Mailchimp API error', error.response?.data || error);
      throw new Error('Error adding subscriber: ' + error.message);
    }
  }
}
