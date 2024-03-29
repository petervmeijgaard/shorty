/* eslint-disable no-underscore-dangle */
// @ts-check
import { clientEnv, clientSchema } from './schema.mjs';

const _clientEnv = clientSchema.safeParse(clientEnv);

export const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) =>
      value && '_errors' in value
        ? `${name}: ${value._errors.join(', ')}\n`
        : '',
    )
    .filter(Boolean);

if (!_clientEnv.success) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_clientEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

Object.keys(_clientEnv.data).forEach(key => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
  );

  throw new Error('Invalid public environment variable name');
});

export const env = _clientEnv.data;
