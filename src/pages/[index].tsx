import { GetServerSidePropsContext } from 'next';
import Card from '@/components/ui/Card';
import { prisma } from '@/server/db';

type Query = {
  readonly index: string;
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<Query>,
) {
  const { index: shortUrl } = ctx.params || {};

  const result = await prisma.url.findFirst({
    where: { shortUrl },
  });

  if (!result) {
    return { notFound: true };
  }

  await prisma.urlVisit.create({
    data: {
      urlId: result.id,
    },
  });

  return {
    redirect: {
      permanent: false,
      destination: result.url,
    },
  };
}

export default function GetAll() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="lg:w-1/2">You should not see this...</Card>
    </div>
  );
}
