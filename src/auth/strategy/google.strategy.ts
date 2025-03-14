import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
 
      // proxy: true, // if you're behind a reverse proxy (like Nginx)
    });
    // console.log('Google Strategy initialized with:', {
    //   clientID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
    //   // callbackURL: 'http://localhost:5000/auth/google/callback',
    //   callbackUrl:process.env.GOOGLE_CALLBACK_URL
    // });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      console.log(name, emails);
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
      };
      console.log(user);
      done(null, user);
    } catch (error: any) {
      return done(error, false);
    }
  }
}
