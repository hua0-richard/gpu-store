import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const nodemailer = require('nodemailer');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(
    email: string,
    pass: string,
    name: string,
  ): Promise<{ access_token: string }> {
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.sendgrid.net',
    //   port: 587,
    //   secure: true,
    //   auth: {
    //     user: 'davin.paucek65@ethereal.email',
    //     pass: 'ydRuSN5sj3bwDCzfPD',
    //   },
    // });

    // (async () => {
    //   const info = await transporter.sendMail({
    //     from: '"Richard" <hua.richard0@gmail.com>',
    //     to: 'hua.richard0@gmail.com',
    //     subject: '2 ✔',
    //     text: 'Hello world?',
    //     html: '<b>Hello world?</b>',
    //   });

    //   console.log('Message sent:', info.messageId);
    // })();
    const user = await this.usersService.createOne(name, email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return { access_token: 'works' };
  }
}
