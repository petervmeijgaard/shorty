import { NextPage } from 'next';
import Head from 'next/head';
import Card from '@/components/ui/Card';
import Notification from '@/components/ui/Notification';

export const NotFound: NextPage = () => (
  <>
    <Head>
      <title>404 - Not Found</title>
    </Head>
    <div className="flex flex-1 items-center justify-center">
      <Card className="lg:w-1/2">
        <Notification.Error className="flex-col">
          <div className="flex flex-1 font-bold">
            Whoops! Something went wrong
          </div>
          <div className="flex flex-1">
            It looks like the URL you are looking for does not exist...
          </div>
        </Notification.Error>
      </Card>
    </div>
  </>
);

export default NotFound;
