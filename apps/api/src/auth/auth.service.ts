import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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

  async createUser(email: string, pass: string, name: string): Promise<{ access_token: string }> {
    const user = await this.usersService.createOne(name, email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return { access_token: "works"}
  }
}
