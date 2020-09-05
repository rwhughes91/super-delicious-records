import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { getDataArray } from '@services/firebase/admin'

interface Props {
  events: typeDefs.Event[]
}

const EventsAdminDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Admin - Events | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage="Events">
        <PrimaryHeader>Events</PrimaryHeader>
        <AdminContainer type="events" eventsData={props.events} />
      </Layout>
    </>
  )
}

export default EventsAdminDetail

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: await getDataArray('/events'),
    },
    revalidate: 1,
  }
}
