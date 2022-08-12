import { createRouter } from './context';
import { z } from 'zod';
import { shortenUrl } from '../../utils/shorten-url';

export const shortyRouter = createRouter().mutation('shortenUrl', {
  input: z.string().url({ message: 'Invalid URL' }),
  resolve: async ({ input: url, ctx }) => {
    const shortUrl = shortenUrl(url);
    const { origin } = ctx.req?.headers ?? {};

    await ctx.prisma.url.create({ data: { url, shortUrl } });

    return origin
      ? `${origin}/${shortUrl}`
      : shortUrl;
  },
});
