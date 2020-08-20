import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '../../styles/pages/news/NewsItemDetail.module.scss'
import Layout from '../../components/Layout/Layout'
import Text from '../../components/UI/Text/Text'
import SecondaryHeader from '../../components/UI/Headers/SecondaryHeader/SecondaryHeader'
import Button from '../../components/UI/Buttons/Button/Button'
import Video from '../../components/UI/Video/Video'

export interface Video {
  src: string
  header: string
}

export interface Link {
  header: string
  src: string
  buttonText: string
}

export interface Props {
  pid: string
  title: string
  shortTitle: string
  imageUrl: string
  description: string[]
  date: string
  videos?: Video[]
  links?: Link[]
}

const NewsItemDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.shortTitle}>
        <div className={classes.NewsItemDetail}>
          <div className={classes.Date}>{props.date}</div>
          <div className={classes.ContentContainer}>
            <div
              className={classes.ImageContainer}
              style={{ backgroundImage: `url(${props.imageUrl})` }}
            >
              {/* <img src={props.imageUrl} alt={props.title} style={{ width: '100%' }} /> */}
            </div>
            <div className={classes.TextContainer}>
              <h1 className={classes.Header}>{props.title}</h1>
              {props.description.map((text, i) => {
                return <Text key={i}>{text}</Text>
              })}
              {props.links &&
                props.links.map((link, i) => {
                  return (
                    <div key={i} className={classes.ButtonContainer}>
                      <Text styles={{ marginBottom: '2rem' }}>{link.header}</Text>
                      <Button color="purple" size="large" href={link.src}>
                        {link.buttonText}
                      </Button>
                    </div>
                  )
                })}
            </div>
          </div>
          {props.videos &&
            props.videos.map((video, i) => {
              return (
                <div key={i}>
                  <SecondaryHeader styles={{ marginBottom: '2rem' }}>
                    {video.header}
                  </SecondaryHeader>
                  <Video src={video.src} title={video.header} />
                </div>
              )
            })}
        </div>
      </Layout>
    </>
  )
}

export default NewsItemDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const pid = context.params?.pid
  const article = cards.find((card) => card.pid === pid)
  return {
    props: {
      ...article,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { pid: '1' } }, { params: { pid: '2' } }, { params: { pid: '3' } }],
    fallback: false,
  }
}

const cards = [
  {
    pid: '1',
    title: `Glass Alice signs with Super Delicious Records`,
    shortTitle: 'Glass Alice Signs',
    imageUrl: '/news/glass-alice.png',
    description: [
      'The Ohio based quartet recently completed work for their debut album Bitten with platinum selling producer Jim Wirt (Incubus, Hoobastank, Spawn Soundtrack). Super Delicious Records will be working with Glass Alice in a number of areas including the September release of Bitten.',
      'Eric Albenze (lead guitar) stated “I am so ready for this opportunity for us … really looking forward to working with you!"',
    ],
    date: 'July 27, 2020',
    videos: [
      {
        src: 'https://www.youtube.com/embed/Tp2Ca2bfNvo',
        header: 'Here’s a sneak preview of Glass Alice’s song "Gravity"',
      },
    ],
  },
  {
    pid: '2',
    title: `Super Delicious Records to re-press HYDRAFORM'S debut Dark Adder CD`,
    imageUrl: '/news/hydraform-dark-adder.jpg',
    shortTitle: 'Dark Adder Re-Press',
    date: 'July 27, 2020',
    description: [
      'Super Delicious Records is pleased to announce that we will be re-pressing HYDRAFORM’s debut album “Dark Adder” on CD to coincide with their upcoming coast to coast US tour supporting thrash legends Overkill!',
      'HYDRAFORM will be selling and autographing CD’s at the shows.',
      'The CD will also be available for sale at the Super Delicious Records/HYDRAFORM online store beginning March 1st along with a host of other fun goodies.',
    ],
    links: [{ header: '', src: '/shop', buttonText: 'Shop Now' }],
  },
  {
    pid: '3',
    title: `New merchandise is now available`,
    imageUrl: '/news/merch.jpg',
    shortTitle: 'New Merchandise',
    date: 'July 27, 2020',
    description: [
      "Great new gift ideas are released frequently. Check out our shop to see our new merch and our artist's products.",
      'Be sure to check out the Super Delicious Records store!',
    ],
    links: [{ header: 'Check out our shop today', src: '/shop', buttonText: 'Shop Now' }],
  },
]
