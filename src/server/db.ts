import { PrismaClient } from '@prisma/client';
import { env } from '@/env.mjs';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

export default prisma;

if (env.NODE_ENV !== 'production') {
  // eslint-disable-next-line functional/immutable-data
  globalForPrisma.prisma = prisma;
}
