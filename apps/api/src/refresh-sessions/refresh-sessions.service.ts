import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { RefreshSession } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class RefreshSessionsService {
  constructor() {}

  async createOneUser(email: string): Promise<boolean> {
    const user = await prisma.refreshSession.findUnique({
      where: { userEmail: email },
    });
    if (user) {
      return false;
    }
    await prisma.refreshSession.create({
      data: {
        userEmail: email,
      },
    });
    return true;
  }

  async createOne(email: string, tokenHash: string): Promise<boolean> {
    const user = await prisma.refreshSession.findUnique({
      where: { userEmail: email },
    });
    if (!user) {
      return false;
    }
    await prisma.refreshSession.update({
      where: { userEmail: email },
      data: {
        refreshHash: tokenHash,
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
    });
    return true;
  }
}
