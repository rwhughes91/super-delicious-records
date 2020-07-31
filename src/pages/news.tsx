import Head from 'next/head'
import News from '../components/pages/News/News'

const news: React.FC = () => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <News />
    </>
  )
}

export default news
