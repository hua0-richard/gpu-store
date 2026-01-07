import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { User } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async findOne(email: string, password: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      return undefined;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return undefined;
    }
    return user;
  }
}
