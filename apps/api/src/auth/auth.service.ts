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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.usersService.findOne(email, pass);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { email: user.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(email: string, pass: string, name: string): Promise<{ access_token: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.usersService.createOne(name, email, pass);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { email: user.email };
    // return {
    //   // 💡 Here the JWT secret key that's used for signing the payload
    //   // is the key that was passsed in the JwtModule
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    return { access_token: "works"}
  }
}
