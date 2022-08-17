import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>Shorty - Shorten your URL</title>
      <meta
        name="description"
        content="A small and easy to use URL shortener"
      />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <div className="flex min-h-screen min-w-full items-center justify-center gap-4 bg-slate-900">
      <div className="container flex flex-1 justify-center p-4">{children}</div>
    </div>
  </>
);

export default Layout;
