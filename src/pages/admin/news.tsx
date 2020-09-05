import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { getDataArray } from '@services/firebase/admin'

interface Props {
  newsData: typeDefs.NewsItem[]
}

const NewsAdminDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Admin - News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage="News">
        <PrimaryHeader>News</PrimaryHeader>
        <AdminContainer type="news" newsData={props.newsData} />
      </Layout>
    </>
  )
}

export default NewsAdminDetail

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      newsData: await getDataArray('/news'),
    },
    revalidate: 1,
  }
}
