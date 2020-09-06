import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { getDataArray } from '@services/firebase/admin'

interface Props {
  artists: typeDefs.Artist[]
}

const EventsAdminDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Admin - Artists | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage="Artists" noFooter>
        <PrimaryHeader>Artists</PrimaryHeader>
        <AdminContainer type="artists" artistsData={props.artists} />
      </Layout>
    </>
  )
}

export default EventsAdminDetail

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      artists: await getDataArray('/artists'),
    },
    revalidate: 1,
  }
}
