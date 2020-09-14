import { useContext } from 'react'
import Head from 'next/head'
import AdminLayout from '@components/Layout/AdminLayout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { GET_EVENTS } from '@queries/index'
import useCancellableSWR from '@hooks/useCancellableSWR'
import { UserContext } from '@context/UserProvider'
import Loader from '@components/UI/Loader/Loader'
import TextBody from '@components/UI/TextBody/TextBody'

const EventsAdminDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const [{ data, error, mutate }] = useCancellableSWR<{ getEvents: typeDefs.Event[] }>(
    GET_EVENTS,
    user.idToken,
    user.user,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  let output = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '12rem',
      }}
    >
      <Loader />
    </div>
  )

  if (data) {
    output = <AdminContainer type="events" eventsData={data.getEvents} mutate={mutate} />
  }

  if (error) {
    output = <TextBody styles={{ color: 'var(--bright-red-color)' }}>{error}</TextBody>
  }
  return (
    <>
      <Head>
        <title>Admin - Events | Super Delicious Records</title>
      </Head>
      <AdminLayout currentPage="Events">
        <PrimaryHeader>Events</PrimaryHeader>
        {output}
      </AdminLayout>
    </>
  )
}

export default EventsAdminDetail
