import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '../../styles/pages/news/News.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Card from '../../components/Card/Card'

interface Props {
  cards: Array<{ pid: string; title: string; imageUrl: string }>
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
              href="/news/[pid]/"
              as={`/news/${card.pid}`}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default News

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      cards: [
        {
          pid: '1',
          title: `Glass Alice signs with Super Delicious Records`,
          imageUrl: '/news/glass-alice.png',
        },
        {
          pid: '2',
          title: `Super Delicious Records to re-press HYDRAFORM'S debut Dark Adder CD`,
          imageUrl: '/news/hydraform-dark-adder.jpg',
        },
        {
          pid: '3',
          title: `New merchandise is now available`,
          imageUrl: '/news/merch.jpg',
        },
      ],
    },
  }
}
