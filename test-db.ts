import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
    const count = await prisma.adventure.count();
    console.log(`Number of adventures: ${count}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
