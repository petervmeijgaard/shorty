import { GetServerSideProps, NextPage } from 'next';
import Card from '@/components/ui/Card';
import { prisma } from '@/server/db';

type Query = {
  readonly index: string;
};

type Props = {
  //
};

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  const result = await prisma.url.findFirst({
    where: { shortUrl: params?.index },
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
};

export const GetAll: NextPage = () => (
  <div className="flex flex-1 items-center justify-center">
    <Card className="lg:w-1/2">You should not see this...</Card>
  </div>
);

export default GetAll;
