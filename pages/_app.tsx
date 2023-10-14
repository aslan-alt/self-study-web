import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import 'styles/global.scss';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>我的科技树</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <script src="//at.alicdn.com/t/c/font_3864759_rlayktq3xys.js" defer></script>
    </QueryClientProvider>
  );
}
