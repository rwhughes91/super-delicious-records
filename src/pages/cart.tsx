import classes from '../styles/pages/Cart.module.scss'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import CartItem from '../components/Shop/CartItem/CartItem'
import { Props as ShopItemProps } from './shop/[pid]'

export interface ShopItem {
  item: ShopItemProps
  qty: number
}

const cart: ShopItem[] = [
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
]

const Cart: React.FC = () => {
  return (
    <>
      <Head>
        <title>Cart | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Cart</PrimaryHeader>
        <div className={classes.Cart}>
          {cart.map((item, i) => {
            return <CartItem key={i} {...item} />
          })}
          <div className={classes.CheckoutContainer}>
            <div className={classes.CheckoutSummaryContainer}>
              <div>
                <div className={classes.Light}>Subtotal</div>
                <div className={[classes.Dollar, classes.Light].join(' ')}>100.00</div>
              </div>
              <div>
                <div className={classes.Light}>Estimated Tax</div>
                <div className={[classes.Dollar, classes.Light].join(' ')}>14.02</div>
              </div>
              <div>
                <div>Total</div>
                <div className={classes.Total}>114.02</div>
              </div>
            </div>
            <button className={classes.Button}>Checkout</button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Cart
