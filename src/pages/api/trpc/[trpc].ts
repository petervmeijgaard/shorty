import { createNextApiHandler } from '@trpc/server/adapters/next';
import { env } from '@/env/server.mjs';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          // eslint-disable-next-line no-console
          console.error(`❌ tRPC failed on ${path || ''}: ${error.message}`);
        }
      : undefined,
});
