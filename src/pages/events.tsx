import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const events: React.FC = () => {
  return (
    <>
      <Head>
        <title>Events | Super Delicious Records</title>
      </Head>
      <Layout pageType="main"></Layout>
    </>
  )
}

export default events
