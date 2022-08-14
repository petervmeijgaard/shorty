import { createRouter } from './context';
import superjson from 'superjson';

import { shortyRouter } from './shorty';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('shorty.', shortyRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
