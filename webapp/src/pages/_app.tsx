import { Xlayout } from '../components/layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
          <Xlayout>
            <Component {...pageProps} />
          </Xlayout>
  )
}
