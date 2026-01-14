import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma';
import { RefreshSession } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class RefreshSessionsService {
  constructor() {}

  async createOneUser(email: string, sessionId: string): Promise<boolean> {
    const user = await prisma.refreshSession.findUnique({
      where: { userEmail: email },
    });
    if (user) {
      return false;
    }
    await prisma.refreshSession.create({
      data: {
        userEmail: email,
        sessionId: sessionId
      },
    });
    return true;
  }

  async createOne(sessionId: string, email: string, tokenHash: string): Promise<boolean> {
    await prisma.refreshSession.create({
      data: {
        userEmail: email,
        sessionId: sessionId,
        refreshHash: tokenHash,
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
    });
    return true;
  }

  async findOneToken(sessionId: string, token: string): Promise<{email: string} | undefined> {
    const userRefreshSession = await prisma.refreshSession.findUnique({
        where: { sessionId: sessionId },
    })
    if (!userRefreshSession) {
      return
    }
    const isValidRefreshToken = await bcrypt.compare(token, userRefreshSession.refreshHash)
    if (!isValidRefreshToken) {
      return
    }

    if (Date.now() < isValidRefreshToken.expiresAt) {
      return
    }

    return {email: userRefreshSession.userEmail}}
  }
