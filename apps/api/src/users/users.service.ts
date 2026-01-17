import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { User } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {}
  async findOne(email: string, password: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
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

  async createOne(name: string, email: string, password: string): Promise<User | undefined> {
    const hashed: string = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashed,
      },
    });
    return user;
  }
}
