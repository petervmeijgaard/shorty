import { type AppType } from 'next/app';
import BaseLayout from '@/components/layouts/BaseLayout';
import { api } from '@/utils/api';

import '@/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => (
  <BaseLayout>
    <Component {...pageProps} />
  </BaseLayout>
);

export default api.withTRPC(MyApp);
