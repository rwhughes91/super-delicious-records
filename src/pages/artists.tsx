import Head from 'next/head'
import Layout from '../components/Layout/Layout'

const artists: React.FC = () => {
  return (
    <>
      <Head>
        <title>Artists | Super Delicious Records</title>
      </Head>
      <Layout pageType="main"></Layout>
    </>
  )
}

export default artists
