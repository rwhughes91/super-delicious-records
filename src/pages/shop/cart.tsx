import { useState, useCallback, useContext, useEffect } from 'react'
import classes from '@styles/pages/shop/Cart.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import CartItem from '@components/Shop/CartItem/CartItem'
import { Props as ShopItemProps } from './[pid]'
import AuthForm from '@components/AuthForm/AuthForm'
import Modal from '@components/UI/Modal/Modal'
import Loader from '@components/UI/Loader/Loader'
import { UserContext } from '@context/UserProvider'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'

export interface ShopItem {
  item: ShopItemProps
  qty: number
}

// const cart: ShopItem[] = [
//   {
//     item: {
//       pid: '1',
//       name: `Super Delicious T-Shirt`,
//       imageUrl: '/shop/sdr-shop-item-small.png',
//       imageSetUrl:
//         '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
//       price: 14.99,
//     },
//     qty: 2,
//   },
//   {
//     item: {
//       pid: '1',
//       name: `Super Delicious T-Shirt`,
//       imageUrl: '/shop/sdr-shop-item-small.png',
//       imageSetUrl:
//         '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
//       price: 14.99,
//     },
//     qty: 1,
//   },
// ]

const Cart: React.FC = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const cart = []

  useEffect(() => {
    if (user.user && loading) {
      setLoading(false)
      setShowForm(false)
    }
  }, [user.user, loading])

  const toggleAuthForm = useCallback(() => {
    setShowForm((prevState) => !prevState)
  }, [])

  const onAuthSubmitHandler = useCallback(() => {
    setLoading(true)
  }, [])

  const checkoutHandler = useCallback(() => {
    router.push('/shop/checkout')
  }, [router])

  const cartItems = (
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
        <div style={{ width: '25rem', alignSelf: 'flex-end' }}>
          <FormButton onClick={checkoutHandler}>Checkout</FormButton>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Cart | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Cart</PrimaryHeader>
        {!user.user && (
          <div className={classes.AuthContainer}>
            <p className={classes.AuthText}>
              Have an account? <button onClick={toggleAuthForm}>Sign in</button>
            </p>
          </div>
        )}
        {showForm && (
          <Modal
            top="0"
            left="0"
            show
            onClick={toggleAuthForm}
            styles={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
            modalStyles={{ padding: '2rem 1rem', width: '95%', maxWidth: '50rem' }}
          >
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '10rem 0',
                }}
              >
                <Loader />
              </div>
            ) : (
              <>
                <button className={classes.Exit} onClick={() => setShowForm(false)}>
                  X
                </button>
                <AuthForm
                  onSubmit={onAuthSubmitHandler}
                  styles={{ boxShadow: 'none', width: '100%' }}
                />
              </>
            )}
          </Modal>
        )}
        {cartItems}
      </Layout>
    </>
  )
}

export default Cart
