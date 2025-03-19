import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedAdmin() {
  console.log('Starting admin seed...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      username: 'admin',
      role: 'admin',
      startHour: '09:00',
      shiftDuration: 8,
    },
  });

  console.log('Admin user seeded:', admin);
  return admin;
}

// Allow this script to be run directly
if (require.main === module) {
  seedAdmin()
    .catch((e) => {
      console.error('Error seeding admin:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
