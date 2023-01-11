/* eslint-disable no-underscore-dangle */
import { z } from 'zod';
import { shortenUrl } from '@/utils/shortenUrl';
import { insertShortUrl } from '../../db/insertShortUrl';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const shortyRouter = createTRPCRouter({
  shortenUrl: publicProcedure
    .input(z.string().url({ message: 'Invalid URL' }))
    .mutation(async ({ input: url, ctx: { req, session } }) => {
      const { user } = session || {};
      const { origin } = req.headers;

      const shortUrl = shortenUrl(url);

      await insertShortUrl({
        user,
        url,
        shortUrl,
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

  deleteAccount: protectedProcedure.mutation(
    async ({ ctx: { session, prisma } }) => {
      await prisma.user.delete({
        where: {
          id: session.user.id,
        },
      });

      return null;
    },
  ),
});

export default shortyRouter;
