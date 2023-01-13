import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import ArrowDownIcon from '~icons/ri/arrow-down-s-fill.jsx';
import FadeTransition from '@/components/transitions/FadeTransition';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import useVisibilityToggle from '@/hooks/useVisibilityToggle';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  const dropdownRef = useRef(null);
  const dropdownMenu = useVisibilityToggle();
  const router = useRouter();
  const { data: session } = useSession();

  useOnClickOutside(dropdownRef, dropdownMenu.hide);

  useEffect(() => {
    router.events.on('routeChangeComplete', dropdownMenu.hide);

    return () => {
      router.events.off('routeChangeComplete', dropdownMenu.hide);
    };
  }, [dropdownMenu.hide, router.events]);

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
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex flex-row items-center gap-2 rounded border border-neutral-100 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                  onClick={dropdownMenu.toggle}
                >
                  <span>Account</span>
                  <ArrowDownIcon className="h-4 w-4" />
                </button>

                <FadeTransition isVisible={dropdownMenu.isVisible}>
                  <div className="absolute right-0 z-10 mt-4 flex w-56 flex-1 flex-col rounded border border-neutral-100 bg-neutral-900 py-1 text-neutral-100">
                    <Link
                      className="flex flex-1 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                      href="/my-account"
                    >
                      My Account
                    </Link>
                    <button
                      className="flex flex-1 py-2 px-3 text-neutral-100 transition hover:bg-neutral-100 hover:text-neutral-900"
                      onClick={() => void signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </FadeTransition>
              </div>
            )}
          </div>
        </div>
        <div className="container flex flex-1">{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
