import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID_Login,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_Login,
      callbackURL: 'http://localhost:3001/api/users/google/login/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    if (!profile) {
      console.log('Profile is undefined');
      return done(new Error('Profile is undefined'), null);
    }

    const { displayName, emails, photos } = profile;
    console.log(profile);

    const user = {
      email: emails[0].value,
      username: displayName,
      picture: photos[0].value,
    };
    done(null, user);
  }
}
