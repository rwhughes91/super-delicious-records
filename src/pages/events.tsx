import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Calendar from '../components/Calendar/Calendar'

const Events: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Events | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Events</PrimaryHeader>
        <Calendar />
      </Layout>
    </>
  )
}

export default Events
