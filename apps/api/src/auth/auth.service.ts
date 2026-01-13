import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RefreshSessionsService } from 'src/refresh-sessions/refresh-sessions.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
const nodemailer = require('nodemailer');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshSessionsService: RefreshSessionsService,
  ) {}

  generateRefreshToken(): string {
    return randomBytes(64).toString('base64url');
  }

  async generateRefreshHash(token: string): Promise<string> {
    return await bcrypt.hash(token, 12);
  }

  async createUserRefreshTokenEntry(email: string): Promise<boolean> {
    const refreshSessionForUser = await this.refreshSessionsService.createOneUser(email);
    if (!refreshSessionForUser) {
      return false;
    }
    return true;
  }

  async createRefreshTokenEntry(email: string): Promise<string> {
    const refreshToken = await this.generateRefreshToken();
    const refreshTokenHash = await this.generateRefreshHash(refreshToken);
    const tokenResult = await this.refreshSessionsService.createOne(email, refreshTokenHash);
    return refreshToken;
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user: { email: string; name: string | null }; access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "5m",
    });
    const refreshToken = await this.createRefreshTokenEntry(email);

    return {
      user: { email: user.email, name: user.name },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async createUser(
    email: string,
    pass: string,
    name: string,
  ): Promise<{ user: { email: string; name: string | null }; access_token: string; refresh_token: string }> {
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
    const userRefreshEntry = await this.createUserRefreshTokenEntry(email);

    if (!userRefreshEntry) {
      throw new InternalServerErrorException('Failed to create refresh token entry for user');
    }

    const payload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "5m",
    });
    const refreshToken = await this.createRefreshTokenEntry(email);

    return {
      user: { email: user.email, name: user.name },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
