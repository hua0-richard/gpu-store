import { prisma } from './lib/prisma';

async function main() {
  const usersData = Array.from({ length: 20 }, (_, i) => {
    const userIndex = i + 1;

    return {
      name: `User ${userIndex}`,
      email: `user${userIndex}@example.com`,
      posts: {
        create: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 }, // 1–3 posts
          (_, j) => ({
            title: `Post ${j + 1} by User ${userIndex}`,
            content: `This is post ${j + 1} written by user ${userIndex}.`,
            published: Math.random() > 0.3,
          }),
        ),
      },
    };
  });

  const createdUsers = await prisma.user.createMany({
    data: usersData.map(({ posts, ...user }) => user),
  });

  // Since createMany doesn't support nested writes, we create users first,
  // then fetch them and create posts per user
  const users = await prisma.user.findMany();

  for (let i = 0; i < users.length; i++) {
    const postCount = Math.floor(Math.random() * 3) + 1;

    await prisma.post.createMany({
      data: Array.from({ length: postCount }, (_, j) => ({
        title: `Post ${j + 1} by ${users[i].name}`,
        content: `This is post ${j + 1} written by ${users[i].name}.`,
        published: Math.random() > 0.3,
        authorId: users[i].id,
      })),
    });
  }

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });

  console.log('Seeded users:', JSON.stringify(allUsers, null, 2));
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
