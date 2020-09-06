import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { getDataArray } from '@services/firebase/admin'

interface Props {
  shop: typeDefs.ShopItem[]
}

const EventsAdminDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Admin - Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage="Artists" noFooter>
        <PrimaryHeader>Shop</PrimaryHeader>
        <AdminContainer type="shop" shopData={props.shop} />
      </Layout>
    </>
  )
}

export default EventsAdminDetail

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      shop: await getDataArray('/shop'),
    },
    revalidate: 1,
  }
}
