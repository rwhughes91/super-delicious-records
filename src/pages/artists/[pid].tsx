import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '@styles/pages/artists/ArtistDetail.module.scss'
import Layout from '@components/Layout/Layout'
import Image from '@components/UI/Image/Image'
import TextBody from '@components/UI/TextBody/TextBody'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import Card from '@components/Card/Card'
import SpotifyIcon from '@components/UI/Icons/SpotifyIcon/SpotifyIcon'
import YoutubeIcon from '@components/UI/Icons/YoutubeIcon/YoutubeIcon'
import AppleIcon from '@components/UI/Icons/AppleIcon/AppleIcon'
import Video from '@components/UI/Video/Video'

import { getDataItem, getDataArray } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { convertFieldsToParams } from '@utils/helpers'

type Props = typeDefs.Artist

const ArtistDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Artists | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.name}>
        <div className={classes.ArtistDetail}>
          <a
            className={classes.ImageContainer}
            href={props.website}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              height="100%"
              width="100%"
              src={props.imageUrl}
              srcSet={props.imageSetUrl}
              alt={`${props.name}'s' image`}
              label={[
                <div key={props.name}>
                  <span className={classes.Title}>{props.name}</span>
                  <span className={classes.Website}>{props.website}</span>
                </div>,
              ]}
              labelSide={props.labelSide}
              labelStyles={{ height: '8rem' }}
            />
          </a>
          <SecondaryHeader>{props.introduction.header}</SecondaryHeader>
          <TextBody center>{props.introduction.body}</TextBody>
          {props.bandMembers && (
            <>
              <SecondaryHeader>Meet the Band</SecondaryHeader>
              <div className={classes.Band}>
                {props.bandMembers.map((member, i) => {
                  return (
                    <div key={i} className={classes.BandMember}>
                      <Image
                        height="100%"
                        width="100%"
                        src={member.imageUrl}
                        srcSet={member.imageSetUrl}
                        alt={member.name}
                        label={member.name}
                        styles={{ cursor: 'auto' }}
                        labelStyles={{ color: 'var(--bright-red-color)', fontSize: '2rem' }}
                      />
                    </div>
                  )
                })}
              </div>
            </>
          )}
          {props.albums && (
            <>
              <SecondaryHeader>Albums</SecondaryHeader>
              <div className={classes.AlbumContainer}>
                {props.albums.map((album, i) => {
                  return (
                    <Card
                      key={i}
                      title={album.name}
                      imageUrl={album.imageUrl}
                      imageSetUrl={album.imageSetUrl}
                      date={album.year.toString()}
                      styles={{ height: '35rem' }}
                      icons={[
                        <a key="spotify" href={album.links.spotify}>
                          <SpotifyIcon size={3.2} styles={{ color: 'var(--bright-blue-color)' }} />
                        </a>,
                        <a key="youtube" href={album.links.youtube}>
                          <YoutubeIcon size={3.5} styles={{ color: 'var(--bright-blue-color)' }} />
                        </a>,
                        <a key="apple" href={album.links.appleMusic || undefined}>
                          <AppleIcon
                            key="apple"
                            size={3.5}
                            styles={{ color: 'var(--bright-blue-color)' }}
                          />
                        </a>,
                      ]}
                    />
                  )
                })}
              </div>
            </>
          )}
          {props.videos && (
            <>
              <SecondaryHeader>Videos</SecondaryHeader>
              <div className={classes.VideoContainer}>
                {props.videos.map((video, i) => {
                  return <Video key={i} src={video.src} title={video.title} />
                })}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default ArtistDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const pid = context.params?.pid as string
  const artist = await getDataItem<typeDefs.Artist>(`/artists/${pid}`)
  return {
    props: {
      ...artist,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await getDataArray<typeDefs.Artist>('/artists')
  return {
    paths: convertFieldsToParams(['pid'], artists),
    fallback: false,
  }
}
