import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import classes from '../styles/pages/Orders.module.scss'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AuthForm from '../components/AuthForm/AuthForm'
import ToggleListItem from '../components/TogglieListItem/ToggleListItem'
import CartItem from '../components/Shop/CartItem/CartItem'
import { ShopItem as ShopItemProps } from './cart'

interface Order {
  pid: string
  date: string
  items: ShopItemProps[]
  total: number
}

const OrdersList: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [admin, setAdmin] = useState(false)

  const toggleSignIn = () => {
    setIsSignedIn((prevState) => !prevState)
  }

  let output = (
    <div className={classes.FormContainer}>
      <AuthForm onSubmit={toggleSignIn} />
    </div>
  )
  if (isSignedIn) {
    output = (
      <>
        <PrimaryHeader>Orders</PrimaryHeader>
        <div className={classes.AdminButton}>
          <Link href="/admin">
            <button>Go to Admin</button>
          </Link>
        </div>
        <div>
          {orders.map((order, i) => {
            let style = {}
            if (i !== 0) {
              style = { borderTop: 'none' }
            }
            return (
              <ToggleListItem
                key={i}
                title={order.date}
                secondaryHeader={`$${order.total}`}
                styles={{ marginTop: 0, width: '100%' }}
                buttonStyles={style}
              >
                {order.items.map((item, i) => {
                  let style = {}
                  if (i + 1 === order.items.length) {
                    style = { borderBottom: 'none' }
                  }
                  return <CartItem key={i} {...item} styles={{ ...style }} />
                })}
              </ToggleListItem>
            )
          })}
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Profile | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">{output}</Layout>
    </>
  )
}

export default OrdersList

const orders: Order[] = [
  {
    pid: '1ALDJF383',
    date: '8/12/2020',
    total: 100,
    items: [
      {
        item: {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item-small.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        qty: 2,
      },
      {
        item: {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item-small.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        qty: 1,
      },
    ],
  },
  {
    pid: 'LSJF3R0384',
    date: '7/15/2020',
    total: 100,
    items: [
      {
        item: {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item-small.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        qty: 2,
      },
      {
        item: {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item-small.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        qty: 1,
      },
    ],
  },
]
