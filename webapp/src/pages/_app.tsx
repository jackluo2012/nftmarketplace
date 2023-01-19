import '../styles/globals.css'
import { Xlayout } from '../components/layout'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
          <Xlayout>
            <Component {...pageProps} />
          </Xlayout>
      </ApolloProvider>
  )
}
