import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
const BGImage = dynamic(() => import("@/components/PageContainer"), {
  ssr: false,
});

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>My Car</title>
      </Head>

      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Header />

          <Component {...pageProps} />
          <Footer />
        </SWRConfig>
      </SessionProvider>
      <BGImage />
    </>
  );
}
