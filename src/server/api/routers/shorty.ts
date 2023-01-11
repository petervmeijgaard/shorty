/* eslint-disable no-underscore-dangle */
import { z } from 'zod';
import { shortenUrl } from '@/utils/shortenUrl';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

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

  myUrls: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const dbUrls = await prisma.url.findMany({
      select: {
        id: true,
        url: true,
        shortUrl: true,
        _count: {
          select: {
            hits: true,
          },
        },
      },
      where: {
        users: {
          some: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        url: 'asc',
      },
    });

    return dbUrls.map(url => ({
      id: url.id,
      url: url.url,
      shortUrl: url.shortUrl,
      hits: url._count.hits,
    }));
  }),
});

export default shortyRouter;
