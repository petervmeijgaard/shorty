import { NextPage } from 'next';
import Head from 'next/head';
import Card from '../components/Card';
import ErrorNotification from '../components/ErrorNotification';

export const NotFound: NextPage = () => (
  <>
    <Head>
      <title>404 - Not Found</title>
    </Head>
    <Card className="lg:w-1/2">
      <ErrorNotification className="flex-col">
        <div className="flex flex-1 font-bold">
          Whoops! Something went wrong
        </div>
        <div className="flex flex-1">
          It looks like the URL you are looking for does not exist...
        </div>
      </ErrorNotification>
    </Card>
  </>
);

export default NotFound;
