import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '../../styles/pages/artists/ArtistDetail.module.scss'
import Layout from '../../components/Layout/Layout'
import Image from '../../components/UI/Image/Image'
import TextBody from '../../components/UI/TextBody/TextBody'
import SecondaryHeader from '../../components/UI/Headers/SecondaryHeader/SecondaryHeader'
import Card from '../../components/Card/Card'
import SpotifyIcon from '../../components/UI/Icons/SpotifyIcon/SpotifyIcon'
import YoutubeIcon from '../../components/UI/Icons/YoutubeIcon/YoutubeIcon'
import AppleIcon from '../../components/UI/Icons/AppleIcon/AppleIcon'
import Video from '../../components/UI/Video/Video'

interface Intro {
  header: string
  body: string
}

interface BandMember {
  name: string
  imageUrl: string
  instrument?: string
}

interface AlbumLink {
  website: string
  youtube: string
  spotify: string
  soundCloud?: string
  appleMusic?: string
}

interface Album {
  name: string
  year: number
  imageUrl: string
  links: AlbumLink
}

interface Video {
  title: string
  src: string
}

interface Props {
  name: string
  website: string
  imageUrl: string
  introduction: Intro
  labelSide?: 'left' | 'right'
  bandMembers?: BandMember[]
  albums?: Album[]
  videos?: Video[]
}

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
                        alt={member.name}
                        label={member.name}
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
                      date={album.year}
                      icons={[
                        <a key="spotify" href={album.links.spotify}>
                          <SpotifyIcon size={3.2} styles={{ color: 'var(--bright-blue-color)' }} />
                        </a>,
                        <a key="youtube" href={album.links.youtube}>
                          <YoutubeIcon size={3.5} styles={{ color: 'var(--bright-blue-color)' }} />
                        </a>,
                        <a key="apple" href={album.links.appleMusic}>
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
  const pid = context.params?.pid
  const article = artists.find((artist) => artist.pid === pid)
  return {
    props: {
      ...article,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { pid: '1' } }, { params: { pid: '2' } }],
    fallback: false,
  }
}

const artists = [
  {
    pid: '1',
    name: `Hydraform`,
    website: 'https://www.hydraformmusic.com/',
    imageUrl: '/artists/hydraform.jpg',
    labelSide: 'left',
    bandMembers: [
      {
        name: 'Carter Pashko',
        imageUrl: '/artists/hydra singer.jpg',
        instrument: 'Singer/Songwriter',
      },
      {
        name: 'Matt Gotlin',
        imageUrl: '/artists/hydra singer.jpg',
        instrument: 'Drummer',
      },
      {
        name: 'John Jarvinen',
        imageUrl: '/artists/hydra singer.jpg',
        instrument: 'Bass',
      },
      {
        name: 'Jacob Streifer',
        imageUrl: '/artists/hydra singer.jpg',
        instrument: 'Guitar',
      },
    ],
    introduction: {
      header:
        'HYDRAFORM is a Hard Rocking Metal Quartet from Denver Colorado working to “Take this world by storm!”',
      body: `As far as metal bands go, HYDRAFORM manages to strike a working balance between accessible and visceral.
      Toth’s rhythms hit with the weight and momentum of a freight train and set the background for Streifer’s machine-gun fast riffing.
      Jarvinen’s low-frequency dominance glues the two together while filling out the band’s core sound. Pashko wields his 
      raking voice with surprising control, pushing the limits of emotion and power without sacrificing tonal quality.`,
    },
    albums: [
      {
        name: 'Dark Adder',
        imageUrl: '/news/hydraform-dark-adder.jpg',
        year: 2016,
        links: {
          website: '#',
          spotify: '#',
          youtube: '#',
          soundCloud: '#',
          appleMusic: '#',
        },
      },
    ],
    videos: [
      {
        title: 'Hydraform-Lamia Dallas, TX',
        src: 'https://www.youtube.com/embed/fnts5y5HFIY',
      },
      {
        title: 'Hydraform-Thrive',
        src: 'https://www.youtube.com/embed/Oe2fQSlWg4Y',
      },
    ],
  },
  {
    pid: '2',
    name: `Glass Alice`,
    website: 'https://glassalicemusic.com/home',
    imageUrl: '/artists/glass-alice.png',
    labelSide: 'left',
    introduction: {
      header: 'Glass Alice header to go here',
      body: 'Lorem Ipsum -- Glass Alice body to go here',
    },
  },
]

interface Video {
  title: string
  src: string
}
