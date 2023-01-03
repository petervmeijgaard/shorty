import { PrismaClient } from '@prisma/client';
import { env } from '../env/server.mjs';

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

export default {
  prisma,
};

if (env.NODE_ENV !== 'production') {
  // eslint-disable-next-line functional/immutable-data
  global.prisma = prisma;
}
