import { User } from 'next-auth';
import { prisma } from '../db';

type Payload = {
  shortUrl: string;
  url: string;
  user?: User | undefined;
};

type InsertShortUrl = (payload: Payload) => Promise<void>;

export const insertShortUrl: InsertShortUrl = async ({
  url,
  shortUrl,
  user,
}) => {
  const dbUrl = await prisma.url.upsert({
    where: { shortUrl },
    update: {},
    create: { shortUrl, url },
  });

  if (!user) return;

  await prisma.urlUser.upsert({
    where: {
      urlId_userId: {
        urlId: dbUrl.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      urlId: dbUrl.id,
      userId: user.id,
    },
  });
};

export default insertShortUrl;
