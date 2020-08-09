import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import classes from '../../styles/pages/shop/Shop.module.scss'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '../../components/Shop/ShopItem/ShopItem'

interface Props {
  items: Array<{ pid: string; name: string; imageUrl: string; imageSetUrl: string; price: number }>
}

const Shop: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Shop</PrimaryHeader>
        <div className={classes.Shop}>
          {props.items.map((item, i) => {
            return <ShopItem {...item} key={i} />
          })}
        </div>
      </Layout>
    </>
  )
}

export default Shop

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      items: [
        {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
        {
          pid: '2',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
        {
          pid: '3',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
        {
          pid: '4',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
        {
          pid: '5',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
        {
          pid: '6',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.jpg',
          imageSetUrl:
            '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
          price: 14.99,
        },
      ],
    },
  }
}
