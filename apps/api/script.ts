import { prisma } from './lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  type User = {
    name: string;
    email: string;
    password: string;
  };

  const usersData: Array<User> = [];

  type RefreshSession = {
    userEmail: string;
  };

  const refreshSessionsData: Array<RefreshSession> = [];

  for (let i = 0; i < 20; i++) {
    const userIndex = i + 1;
    const hash = await bcrypt.hash(String(i), 12).catch((err: any) => {
      console.error(err);
      return '';
    });
    usersData.push({
      name: `User ${userIndex}`,
      email: `user${userIndex}@example.com`,
      password: hash,
    });

    refreshSessionsData.push({
      userEmail: `user${userIndex}@example.com`,
    });
  }

  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  await prisma.refreshSession.createMany({
    data: refreshSessionsData,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
