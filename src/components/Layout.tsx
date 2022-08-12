import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>Shorty - Shorten your URL</title>
      <meta name="description" content="A small and easy to use URL shortener"/>
      <link rel="icon" href="/public/favicon.ico"/>
    </Head>
    <div className="flex min-w-full min-h-screen bg-slate-900 gap-4 items-center justify-center">
      <div className="flex flex-1 container justify-center">
        {children}
      </div>
    </div>
  </>
);

export default Layout;
