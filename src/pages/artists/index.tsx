import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '../../styles/pages/artists/Artists.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Image from '../../components/UI/Image/Image'
import Button from '../../components/UI/Buttons/Button/Button'
import TertiaryHeader from '../../components/UI/Headers/TertiaryHeader/TertiaryHeader'
import Link from 'next/link'

interface Props {
  artists: Array<{
    pid: string
    name: string
    website: string
    imageUrl: string
    labelSide?: 'left' | 'right'
  }>
}

const Artists: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Artists | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Artists</PrimaryHeader>
        <div className={classes.Images}>
          {props.artists.map((artist, i) => {
            return (
              <Link key={i} href="/artists/[pid]" as={`/artists/${artist.pid}`}>
                <div key={i} className={classes.ImageContainer}>
                  <Image
                    height="300px"
                    width="500px"
                    src={artist.imageUrl}
                    alt={`${artist.name}'s' image`}
                    styles={{ margin: '1rem' }}
                    label={artist.name}
                    labelSide={artist.labelSide}
                  />
                </div>
              </Link>
            )
          })}
        </div>
        <div className={classes.Interested}>
          <TertiaryHeader styles={{ fontSize: '1.6rem' }}>
            Interested in joining our label?
          </TertiaryHeader>
          <Button color="purple" size="large" href="/about-us">
            Learn More
          </Button>
        </div>
      </Layout>
    </>
  )
}

export default Artists

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      artists: [
        {
          pid: '1',
          name: `Hydraform`,
          website: 'https://www.hydraformmusic.com/',
          imageUrl: '/artists/hydraform.jpg',
          labelSide: 'left',
        },
        {
          pid: '2',
          name: `Glass Alice`,
          website: 'https://glassalicemusic.com/home',
          imageUrl: '/artists/glass-alice.png',
          labelSide: 'left',
        },
      ],
    },
  }
}
