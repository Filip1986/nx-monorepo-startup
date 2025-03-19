import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seeds/adminSeed';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  console.log('Seeding admin user...');
  try {
    const users = await seedAdmin();
    console.log('Admin user seeded successfully:', users);
  } catch (error) {
    console.error('Error during seeding:', error);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Unhandled error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma client...');
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });
