import { z } from 'zod';
import { shortenUrl } from '@/utils/shortenUrl';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const shortyRouter = createTRPCRouter({
  shortenUrl: publicProcedure
    .input(z.string().url({ message: 'Invalid URL' }))
    .mutation(async ({ input: url, ctx }) => {
      const shortUrl = shortenUrl(url);
      const { origin } = ctx.req.headers;

      const data = { url, shortUrl };

      await ctx.prisma.url.upsert({
        where: { shortUrl },
        create: data,
        update: data,
      });

      return origin ? `${origin}/${shortUrl}` : shortUrl;
    }),
});

export default shortyRouter;
