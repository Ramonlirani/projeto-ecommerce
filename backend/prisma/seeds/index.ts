import { PrismaClient } from '@prisma/client';

import { permissions } from './permissions';

const prisma = new PrismaClient();

async function main() {
  try {
    await permissions(prisma);
  } catch (error) {
    console.log(error);
  }
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
