import Head from 'next/head'
import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function App ({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>DistortNewYork</title>
        <meta name='description' content='Find Events in NYC' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}
