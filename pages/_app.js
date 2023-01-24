import GlobalStyle from "@/styles";
import Head from "next/head";
import useAtom from "jotai";
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
