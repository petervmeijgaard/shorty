import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { ModalProvider, Modal } from '@/context/ModalContext';
import { api } from '@/utils/api';

import '@/styles/globals.css';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <BaseLayout>
          <Component {...pageProps} />
          <Modal />
        </BaseLayout>
        <Analytics />
      </ModalProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
