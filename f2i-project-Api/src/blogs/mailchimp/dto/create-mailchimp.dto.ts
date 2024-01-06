import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the subscriber',
    required: true,
  })
  email: string;
}
