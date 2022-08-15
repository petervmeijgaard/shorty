import { GetServerSideProps, NextPage } from 'next';
import { prisma } from '../server/db/client';
import Card from '../components/Card';

type Query = {
  index: string;
}

export const getServerSideProps: GetServerSideProps<{}, Query> = async ({ params }) => {
  const result = await prisma.url.findFirst({ where: { shortUrl: params?.index } });

  if (!result) {
    return { notFound: true };
  }

  return {
    redirect: {
      permanent: false,
      destination: result.url,
    },
  };
};

export const GetAll: NextPage = () => (
  <Card className="lg:w-1/2">
    You should not see this...
  </Card>
);

export default GetAll;
