import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Calendar from '../components/Calendar/Calendar'

export interface Props {
  pid: string
  date: string
  title: string
  description?: string
  url?: string
  endDate?: string
  location?: string
}

const Events: React.FC = () => {
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
