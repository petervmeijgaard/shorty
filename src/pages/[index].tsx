import { GetServerSideProps, NextPage } from 'next';
import { prisma } from '../server/db/client';
import Card from '../components/Card';

type Query = {
  index: string;
}

export const getServerSideProps: GetServerSideProps<{}, Query> = async ({ params }) => {
  try {
    const { url } = await prisma.url.findFirstOrThrow({ where: { shortUrl: params?.index } });

    return {
      redirect: {
        permanent: false,
        destination: url,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const GetAll: NextPage = () => (
  <Card>
    You should not see this...
  </Card>
);

export default GetAll;
