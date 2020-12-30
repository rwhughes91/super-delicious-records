import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '@styles/pages/news/NewsItemDetail.module.scss'
import Layout from '@components/Layout/Layout'
import Body from '@components/Layout/Body'
import Text from '@components/UI/Text/Text'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import Button from '@components/UI/Buttons/Button/Button'
import Video from '@components/UI/Video/Video'
import { FirebaseAdmin } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { convertFieldsToParams } from '@utils/helpers'
import ShopImage from '@components/Shop/ShopImage/ShopImage'

type Props = typeDefs.NewsItem

const NewsItemDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.shortTitle}>
        <Body>
          <div className={classes.Date}>{new Date(props.date).toLocaleDateString()}</div>
          <SecondaryHeader>{props.title}</SecondaryHeader>
          <div className={classes.ContentContainer}>
            <div className={classes.ImageContainer}>
              <ShopImage
                size="25rem"
                imageUrl={props.imageUrl}
                imageSetUrl={props.imageSetUrl}
                alt={props.shortTitle}
                base64={props.base64}
                styles={{ height: 'auto' }}
              />
            </div>
            <div className={classes.TextContainer}>
              {props.description.map((text, i) => {
                return <Text key={i}>{text}</Text>
              })}
            </div>
          </div>
          {props.links &&
            props.links.map((link, i) => {
              return (
                <div key={i} className={classes.ButtonContainer}>
                  <SecondaryHeader styles={{ marginBottom: '2rem' }}>{link.header}</SecondaryHeader>
                  <Button color="purple" size="large" href={link.src}>
                    {link.buttonText}
                  </Button>
                </div>
              )
            })}
          {props.videos &&
            props.videos.map((video, i) => {
              return (
                <div key={i}>
                  <SecondaryHeader styles={{ marginBottom: '2rem' }}>{video.title}</SecondaryHeader>
                  <Video src={video.src} title={video.title} />
                </div>
              )
            })}
        </Body>
      </Layout>
    </>
  )
}

export default NewsItemDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const fb = new FirebaseAdmin('newsProps')
  const pid = context.params?.pid as string
  const newsItem = await fb.getDataItem<typeDefs.NewsItem>(`/news/${pid}`)
  await fb.delete()
  return {
    props: {
      ...newsItem,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fb = new FirebaseAdmin('newsPaths')
  const news = await fb.getDataArray<typeDefs.NewsItem>('/news')
  await fb.delete()
  return {
    paths: convertFieldsToParams(['pid'], news),
    fallback: false,
  }
}
