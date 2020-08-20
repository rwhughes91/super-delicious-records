import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AdminContainer from '../../components/Admin/AdminContainer/AdminContainer'
import { Props as NewsProps } from '../news/[pid]'
import { Props as ArtistProps } from '../artists/[pid]'
import { Props as EventProps } from '../events'
import { Props as ShopProps } from '../shop/[pid]'

interface Props {
  type: 'news' | 'artists' | 'events' | 'shop'
  newsData?: NewsProps[]
  artistsData?: ArtistProps[]
  eventsData?: EventProps[]
  shopData?: ShopProps[]
}

const NewsAdminDetail: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{`Admin - ${
          props.type.charAt(0).toUpperCase() + props.type.slice(1)
        } | Super Delicious Records`}</title>
      </Head>
      <Layout
        pageType="main"
        currentPage={props.type.charAt(0).toUpperCase() + props.type.slice(1)}
      >
        <PrimaryHeader>{props.type}</PrimaryHeader>
        <AdminContainer
          type={props.type}
          newsData={props.newsData}
          artistsData={props.artistsData}
          eventsData={props.eventsData}
          shopData={props.shopData}
        />
      </Layout>
    </>
  )
}

export default NewsAdminDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const type = context.params?.pid as string
  return {
    props: {
      type,
      newsData,
      artistsData,
      shopData,
      eventsData,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: 'news' } },
      { params: { pid: 'artists' } },
      { params: { pid: 'shop' } },
      { params: { pid: 'events' } },
    ],
    fallback: false,
  }
}

const shopData: ShopProps[] = [
  {
    pid: '1',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '2',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '3',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '4',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '5',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '6',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
]

const eventsData: EventProps[] = [
  {
    pid: '5',
    date: '7/31/2020',
    title: 'Glass Alice Signing',
    description: 'Glass Alice signs with Super Delicious Records',
    url: 'some link',
  },
  {
    pid: '7',
    date: '8/3/2020',
    title: 'Glass Alice Signing',
    description: 'Glass Alice signs with Super Delicious Records',
    url: 'some link',
  },
  {
    pid: '6',
    date: '8/3/2020',
    title: 'Glass Alice Signing',
    description: 'Glass Alice signs with Super Delicious Records',
    url: 'some link',
  },
  {
    pid: '4',
    date: '8/4/2020',
    title: 'Glass Alice Signing',
    description: 'Glass Alice signs with Super Delicious Records',
    url: 'some link',
  },
  {
    pid: '3',
    date: '8/18/2020 4:00',
    title: 'Dark Adder Re-Press',
  },
  {
    pid: '2',
    date: '8/29/2020 16:00',
    endDate: '8/30/2020 20:00',
    title: 'Tour Starts',
    description: `HYDRAFORM tour begins!
  The tour will begin in LA and end in New York. There will be 42 shows in just under 3 months.`,
    location: 'Boulder, CO',
    url: 'some link',
  },
]

const artistsData: ArtistProps[] = [
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
        year: '2016',
        links: {
          website: '#',
          spotify: '#',
          youtube: '#',
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

const newsData: NewsProps[] = [
  {
    pid: '1',
    title: `Glass Alice signs with Super Delicious Records`,
    shortTitle: 'Glass Alice Signs',
    imageUrl: '/news/glass-alice.png',
    description: [
      'The Ohio based quartet recently completed work for their debut album Bitten with platinum selling producer Jim Wirt (Incubus, Hoobastank, Spawn Soundtrack). Super Delicious Records will be working with Glass Alice in a number of areas including the September release of Bitten.',
      'Eric Albenze (lead guitar) stated “I am so ready for this opportunity for us … really looking forward to working with you!"',
    ],
    date: 'July 27,2020',
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
    date: 'July 27,2020',
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
    date: 'July 27,2020',
    description: [
      "Great new gift ideas are released frequently. Check out our shop to see our new merch and our artist's products.",
      'Be sure to check out the Super Delicious Records store!',
    ],
    links: [{ header: 'Check out our shop today', src: '/shop', buttonText: 'Shop Now' }],
  },
]
