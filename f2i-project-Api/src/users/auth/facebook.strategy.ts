import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy } from 'passport-facebook';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/users/facebook/login/callback',
      scope: 'email',
      profileFields: ['emails', 'name', 'picture.type(large)'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ) {
    if (!profile) {
      console.log('Profile is undefined');
      return done(new Error('Profile is undefined'), null);
    }

    const { name, emails, photos } = profile;
    console.log(profile);

    const givenName = name?.givenName || '';
    const familyName = name?.familyName || '';

    let username = '';
    if (givenName && familyName) {
      username = `${givenName} ${familyName}`;
    } else if (givenName || familyName) {
      username = givenName || familyName;
    }

    const user = {
      email: emails?.[0]?.value || '',
      username: username,
      picture: photos?.[0]?.value || '',
    };

    done(null, user);
  }
}
