import Head from 'next/head'
import Events from '../components/pages/Events/Events'

const events: React.FC = () => {
  return (
    <>
      <Head>
        <title>Events | Super Delicious Records</title>
      </Head>
      <Events />
    </>
  )
}

export default events
