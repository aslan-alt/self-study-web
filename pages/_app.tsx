import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import 'styles/global.scss';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>我的科技树</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
