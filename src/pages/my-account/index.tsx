import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import {
  AccountSettings,
  MyUrls,
  PersonalInformation,
} from '@/components/pages/my-account';
import Card from '@/components/ui/Card';

export const MyAccount: NextPage = () => (
  <>
    <Head>
      <title>Shorty - My Account</title>
    </Head>
    <div className="flex flex-1 overflow-scroll p-4">
      <Card className="flex-col gap-4 md:flex-row">
        <PersonalInformation className="md:w-[200px]" />
        <hr className="hidden h-full border-l border-dotted border-neutral-400 md:flex" />
        <hr className="flex h-full w-full border-t border-dotted border-neutral-400 md:hidden" />
        <div className="flex flex-1 flex-col gap-4">
          <MyUrls />
          <hr className="md:w-[calc(100% + 1rem)] border-t border-dotted border-neutral-400 md:-ml-4" />
          <AccountSettings />
        </div>
      </Card>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default MyAccount;
