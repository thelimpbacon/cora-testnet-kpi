import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Inter } from "@next/font/google";
import { Fragment } from "react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/cora-protocol/cora-aurora-tesnet",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Fragment>
  );
}
