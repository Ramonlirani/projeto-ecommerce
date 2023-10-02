import Head from "next/head";
import type { AppProps } from "next/app";

import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ToastContainer } from "react-toastify";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </div>
  );
}
