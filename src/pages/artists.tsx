import Head from 'next/head'
import Artists from '../components/pages/Artists/Artists'

const artists: React.FC = () => {
  return (
    <>
      <Head>
        <title>Artists | SDR</title>
      </Head>
      <Artists />
    </>
  )
}

export default artists
