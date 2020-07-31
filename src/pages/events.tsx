import Head from 'next/head'
import Events from '../components/pages/Events/Events'

const events: React.FC = () => {
  return (
    <>
      <Head>
        <title>Events | SDR</title>
      </Head>
      <Events />
    </>
  )
}

export default events
