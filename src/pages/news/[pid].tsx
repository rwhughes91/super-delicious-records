import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '@styles/pages/news/NewsItemDetail.module.scss'
import Layout from '@components/Layout/Layout'
import Text from '@components/UI/Text/Text'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import Button from '@components/UI/Buttons/Button/Button'
import Video from '@components/UI/Video/Video'
import { getDataItem, getDataArray } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { convertFieldsToParams } from '@utils/helpers'

type Props = typeDefs.NewsItem

const NewsItemDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>News | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.shortTitle}>
        <div className={classes.NewsItemDetail}>
          <div className={classes.Date}>{new Date(props.date).toLocaleDateString()}</div>
          <div className={classes.ContentContainer}>
            <div
              className={classes.ImageContainer}
              style={{ backgroundImage: `url(${props.imageUrl})` }}
            ></div>
            <div className={classes.TextContainer}>
              <h1 className={classes.Header}>{props.title}</h1>
              {props.description.map((text, i) => {
                return <Text key={i}>{text}</Text>
              })}
              {props.links &&
                props.links.map((link, i) => {
                  return (
                    <div key={i} className={classes.ButtonContainer}>
                      <Text styles={{ marginBottom: '2rem', fontFamily: 'Open Sans SemiBold' }}>
                        {link.header}
                      </Text>
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
                  <SecondaryHeader styles={{ marginBottom: '2rem' }}>{video.title}</SecondaryHeader>
                  <Video src={video.src} title={video.title} />
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
  const pid = context.params?.pid as string
  const newsItem = await getDataItem<typeDefs.NewsItem>(`/news/${pid}`)
  return {
    props: {
      ...newsItem,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await getDataArray<typeDefs.NewsItem>('/news')
  return {
    paths: convertFieldsToParams(['pid'], news),
    fallback: false,
  }
}
