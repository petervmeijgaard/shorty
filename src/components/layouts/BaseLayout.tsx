import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A small and easy to use URL shortener"
        />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div className="flex min-h-screen min-w-full flex-col items-center justify-center bg-neutral-900">
        <div className="container flex w-full items-center justify-between py-4">
          <Link className="flex text-neutral-100" href="/">
            Shorty
          </Link>
          <div className="flex gap-4">
            {!session && (
              <Link
                className="rounded border border-neutral-100 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                href="/auth/sign-in"
              >
                Sign in
              </Link>
            )}

            {session && (
              <>
                <Link
                  className="rounded border border-neutral-100 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                  href="/my-account"
                >
                  My Account
                </Link>
                <button
                  className="rounded border border-neutral-100 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
        <div className="container flex flex-1">{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
