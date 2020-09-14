import Head from 'next/head'
import { GetStaticProps } from 'next'
import classes from '@styles/pages/artists/Artists.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Image from '@components/UI/Image/Image'
import Button from '@components/UI/Buttons/Button/Button'
import TertiaryHeader from '@components/UI/Headers/TertiaryHeader/TertiaryHeader'
import Link from 'next/link'
import { getDataArray } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { extractFields } from '@utils/helpers'

interface Props {
  artists: Pick<
    typeDefs.Artist,
    'pid' | 'name' | 'website' | 'imageUrl' | 'imageSetUrl' | 'labelSide'
  >[]
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
                    srcSet={artist.imageSetUrl}
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
          <TertiaryHeader styles={{ marginBottom: '2rem' }}>
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
  const artists = await getDataArray<typeDefs.Artist>('/artists')
  return {
    props: {
      artists: extractFields(
        ['pid', 'name', 'website', 'imageUrl', 'imageSetUrl', 'labelSide'],
        artists
      ),
    },
    revalidate: 1,
  }
}
