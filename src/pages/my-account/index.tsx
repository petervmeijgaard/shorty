import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import {
  PersonalInformation,
  AccountSettings,
  MyUrls,
  DeleteAccountModal,
} from '@/components/pages/my-account';
import FadeTransition from '@/components/transitions/FadeTransition';
import Card from '@/components/ui/Card';
import Overlay from '@/components/ui/Overlay';
import useVisibilityToggle from '@/hooks/useVisibilityToggle';

export const MyAccount: NextPage = () => {
  const modal = useVisibilityToggle();

  return (
    <>
      <Head>
        <title>Shorty - My Account</title>
      </Head>
      <div className="flex flex-1 pb-4">
        <Card className="flex-row gap-4">
          <PersonalInformation className="w-[200px]" />
          <hr className="h-full border-l border-dotted border-neutral-400" />
          <div className="flex flex-1 flex-col gap-4">
            <MyUrls />
            <hr className="w-[calc(100% + 4rem)] -ml-4 border-t border-dotted border-neutral-400" />
            <AccountSettings onDeleteAccount={modal.show} />
          </div>
        </Card>
      </div>
      <FadeTransition isVisible={modal.isVisible}>
        <Overlay>
          <DeleteAccountModal onCloseModal={modal.hide} />
        </Overlay>
      </FadeTransition>
    </>
  );
};

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
