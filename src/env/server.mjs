/* eslint-disable no-underscore-dangle */
// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { env as clientEnv, formatErrors } from './client.mjs';
import { serverSchema } from './schema.mjs';

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

Object.keys(_serverEnv.data).forEach(key => {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn('❌ You are exposing a server-side env-variable:', key);

  throw new Error('You are exposing a server-side env-variable');
});

export const env = { ..._serverEnv.data, ...clientEnv };

export default env;
