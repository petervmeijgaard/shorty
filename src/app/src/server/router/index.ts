// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { shortyRouter } from './shorty';

export const appRouter = createRouter()
  .transformer(superjson)
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' &&
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  })
  .merge('shorty.', shortyRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
