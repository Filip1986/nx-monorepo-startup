import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUser() {
  console.log('Starting user seed...');
  const hashedPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword,
      username: 'user',
      role: 'user',
      startHour: '09:00',
      shiftDuration: 8,
    },
  });

  console.log('User seeded:', user);
  return user;
}

// Allow this script to be run directly
if (require.main === module) {
  seedUser()
    .catch((e) => {
      console.error('Error seeding user:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
