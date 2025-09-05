import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import StoreProvider from '@/providers/StoreProvider';

import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  style: ['normal'],
  display: 'swap',
});

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Movies</title>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="фильмы, кино, подборки фильмов" />
      </Head>
      <StoreProvider>
        <AnimatePresence mode="wait" initial={false}>
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </StoreProvider>
    </>
  );
};

export default App;
