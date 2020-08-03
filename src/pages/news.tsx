import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '../styles/pages/News.module.scss'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Card from '../components/Card/Card'

interface Props {
  cards: Array<{ title: string; url: string }>
}

const news: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>News</PrimaryHeader>
        <div className={classes.Cards}>
          {props.cards.map((card, i) => (
            <Card key={i} title={card.title} imageUrl={card.url} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default news

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      cards: [
        {
          title: `Glass Alice signs with Super Delicious Records`,
          url: '/news/glass-alice.png',
        },
        {
          title: `Super Delicious Records to re-press HYDRAFORM'S debut Dark Adder CD`,
          url: '/news/hydraform-dark-adder.jpg',
        },
        {
          title: `New merchandise is now available`,
          url: '/news/merch.jpg',
        },
      ],
    },
  }
}
