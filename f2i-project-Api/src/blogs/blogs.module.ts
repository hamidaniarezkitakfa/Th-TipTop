import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailchimpService } from './mailchimp/mailchimp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    JwtModule.register({
      secret: 'iasojasjzdnncydbncsdqdq',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, JwtService, MailchimpService],
})
export class BlogsModule {}
