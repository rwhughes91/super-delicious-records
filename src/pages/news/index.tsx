import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '@styles/pages/news/News.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Card from '@components/Card/Card'
import { getDataArray } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { extractFields } from '@utils/helpers'

interface Props {
  cards: Pick<typeDefs.NewsItem, 'pid' | 'title' | 'imageUrl' | 'imageSetUrl' | 'date'>[]
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
  const news = await getDataArray<typeDefs.NewsItem>('/news')
  return {
    props: {
      cards: extractFields(['pid', 'title', 'imageUrl', 'date', 'imageSetUrl'], news),
    },
    revalidate: 1,
  }
}
