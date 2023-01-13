import { Analytics } from '@vercel/analytics/react';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { api } from '@/utils/api';

import '@/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
    <Analytics />
  </SessionProvider>
);

export default api.withTRPC(MyApp);
