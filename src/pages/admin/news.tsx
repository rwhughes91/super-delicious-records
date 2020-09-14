import { useContext } from 'react'
import Head from 'next/head'
import AdminLayout from '@components/Layout/AdminLayout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '@components/Admin/AdminContainer/AdminContainer'
import * as typeDefs from '@generated/graphql'
import { GET_NEWS } from '@queries/index'
import useCancellableSWR from '@hooks/useCancellableSWR'
import { UserContext } from '@context/UserProvider'
import Loader from '@components/UI/Loader/Loader'
import TextBody from '@components/UI/TextBody/TextBody'

const NewsAdminDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const [{ data, error, mutate, isValidating }] = useCancellableSWR<{
    getNews: typeDefs.NewsItem[]
  }>(GET_NEWS, user.idToken, user.user, {
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
        type="news"
        newsData={data.getNews}
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
        <title>Admin - News | Super Delicious Records</title>
      </Head>
      <AdminLayout currentPage="News">
        <PrimaryHeader>News</PrimaryHeader>
        {output}
      </AdminLayout>
    </>
  )
}

export default NewsAdminDetail
