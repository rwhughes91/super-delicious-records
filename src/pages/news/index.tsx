import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '@styles/pages/news/News.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Card from '@components/Card/Card'
import { FirebaseAdmin } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { extractFields } from '@utils/helpers'

interface Props {
  cards: Pick<typeDefs.NewsItem, 'pid' | 'title' | 'imageUrl' | 'imageSetUrl' | 'date' | 'base64'>[]
}

const News: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Latest News</PrimaryHeader>
        <div className={classes.Cards}>
          {props.cards.map((card, i) => (
            <Card
              key={i}
              title={card.title}
              imageUrl={card.imageUrl}
              imageSetUrl={card.imageSetUrl}
              base64={card.base64}
              href="/news/[pid]/"
              as={`/news/${card.pid}`}
              date={card.date}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default News

export const getStaticProps: GetStaticProps = async () => {
  const fb = new FirebaseAdmin('news')
  const news = await fb.getDataArray<typeDefs.NewsItem>('/news')
  await fb.delete()
  return {
    props: {
      cards: extractFields(['pid', 'title', 'imageUrl', 'date', 'imageSetUrl', 'base64'], news),
    },
    revalidate: 1,
  }
}
