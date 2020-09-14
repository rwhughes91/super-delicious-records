import { useContext } from 'react'
import Head from 'next/head'
import AdminLayout from '@components/Layout/AdminLayout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { GET_ARTISTS } from '@queries/index'
import useCancellableSWR from '@hooks/useCancellableSWR'
import { UserContext } from '@context/UserProvider'
import Loader from '@components/UI/Loader/Loader'
import TextBody from '@components/UI/TextBody/TextBody'

const EventsAdminDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const [{ data, error, mutate, isValidating }] = useCancellableSWR<{
    getArtists: typeDefs.Artist[]
  }>(GET_ARTISTS, user.idToken, user.user, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

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
    output = (
      <AdminContainer
        type="artists"
        artistsData={data.getArtists}
        mutate={mutate}
        isValidating={isValidating}
      />
    )
  }

  if (error) {
    output = <TextBody styles={{ color: 'var(--bright-red-color)' }}>{error}</TextBody>
  }

  return (
    <>
      <Head>
        <title>Admin - Artists | Super Delicious Records</title>
      </Head>
      <AdminLayout currentPage="Artists">
        <PrimaryHeader>Artists</PrimaryHeader>
        {output}
      </AdminLayout>
    </>
  )
}

export default EventsAdminDetail
