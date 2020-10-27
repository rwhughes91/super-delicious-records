import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Calendar from '@components/Calendar/Calendar'
import { FirebaseAdmin } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'

export interface Event extends Omit<typeDefs.Event, 'date' | 'endDate'> {
  date: Date
  endDate: Date | undefined
}
export interface Props {
  events: Event[]
}

const Events: React.FC<Props> = (props) => {
  const convertedEvents = []
  for (const event of props.events) {
    convertedEvents.push({
      ...event,
      date: new Date(event.date),
      endDate: event.endDate ? new Date(event.endDate) : undefined,
    })
  }
  return (
    <>
      <Head>
        <title>Events | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Events</PrimaryHeader>
        <Calendar events={convertedEvents} />
      </Layout>
    </>
  )
}

export default Events

export const getStaticProps: GetStaticProps = async () => {
  const fb = new FirebaseAdmin('events')
  const events = await fb.getDataArray<typeDefs.Event>('/events')
  await fb.delete()
  return {
    props: {
      events,
    },
    revalidate: 1,
  }
}
