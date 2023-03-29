import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { type Provider } from 'next-auth/providers';
import { getProviders, getSession } from 'next-auth/react';
import { ProviderLoginButton } from '@/components/pages/auth/sign-in';
import Card from '@/components/ui/Card';

type Props = {
  providers: Record<string, Provider>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { providers },
  };
}

export default function Login({ providers }: Props) {
  return (
    <>
      <Head>
        <title>Shorty - Login</title>
      </Head>
      <div className="flex flex-1 items-center justify-center">
        <Card className="lg:w-1/2">
          <form className="flex flex-1 flex-col items-start gap-4">
            {Object.values(providers).map(provider => (
              <ProviderLoginButton {...provider} key={provider.id} />
            ))}
          </form>
        </Card>
      </div>
    </>
  );
}
