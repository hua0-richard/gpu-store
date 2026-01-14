import { prisma } from './lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
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
