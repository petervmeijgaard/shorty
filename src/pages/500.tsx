import { NextPage } from 'next';
import Head from 'next/head';
import Card from '../components/Card';
import ErrorNotification from '../components/ErrorNotification';

export const NotFound: NextPage = () => (
  <>
    <Head>
      <title>500 - Internal server error</title>
    </Head>
    <Card className="w-1/2">
      <ErrorNotification>
        <div className="flex flex-1 font-bold">
          Whoops! Something went wrong
        </div>
        <div className="flex flex-1">
          It looks like we need to fix something on our end...
        </div>
      </ErrorNotification>
    </Card>
  </>
);

export default NotFound;