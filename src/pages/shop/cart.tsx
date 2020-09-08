import { useState, useCallback, useContext, useEffect } from 'react'
import classes from '@styles/pages/shop/Cart.module.scss'
import Head from 'next/head'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import CartItem from '@components/Shop/CartItem/CartItem'
import AuthForm from '@components/AuthForm/AuthForm'
import Modal from '@components/UI/Modal/Modal'
import Loader from '@components/UI/Loader/Loader'
import TextBody from '@components/UI/TextBody/TextBody'
import { UserContext } from '@context/UserProvider'
import { CartContext } from '@context/CartProvider'
import CheckoutButton from '@components/CheckoutButton/CheckoutButton'
import FlashMessage from '@components/FlashMessage/FlashMessage'

const Cart: React.FC = () => {
  const { user } = useContext(UserContext)
  const { cart, loading: cartLoading } = useContext(CartContext)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tax = (cart.subTotal * 0.02).toFixed(2)
  const total = (cart.subTotal * 0.02 + cart.subTotal).toFixed(2)

  useEffect(() => {
    if (user.user && loading) {
      setLoading(false)
      setShowForm(false)
    }
  }, [user.user, loading])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let timer: NodeJS.Timeout
    if (params.get('cancelled')) {
      setError('The order has been cancelled')
      timer = setTimeout(() => {
        setError('')
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [])

  const toggleAuthForm = useCallback(() => {
    setShowForm((prevState) => !prevState)
  }, [])

  const onAuthSubmitHandler = useCallback(() => {
    setLoading(true)
  }, [])

  const fullCartItems = cart.cart.local.concat(cart.cart.user)

  let cartItems
  if (cartLoading) {
    cartItems = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10rem 0',
        }}
      >
        <Loader />
        <TextBody styles={{ fontSize: '1.8rem', marginTop: '5rem' }}>
          Hold tight while we grab your cart!
        </TextBody>
      </div>
    )
  } else {
    if (fullCartItems.length > 0) {
      cartItems = (
        <div className={classes.Cart}>
          {fullCartItems.map((item) => {
            return (
              <CartItem
                key={item.pid}
                pid={item.pid}
                qty={item.qty}
                purchasePrice={item.shopItem.price}
                shopItem={item.shopItem}
                shopPid={item.shopPid}
                color={item.color}
                size={item.size}
              />
            )
          })}
          <div className={classes.CheckoutContainer}>
            <div className={classes.CheckoutSummaryContainer}>
              <div>
                <div className={classes.Light}>Subtotal</div>
                <div className={[classes.Dollar, classes.Light].join(' ')}>
                  {cart.subTotal.toFixed(2)}
                </div>
              </div>
              <div>
                <div>
                  <span className={classes.Light}>Tax</span>
                  <span
                    className={classes.Light}
                    style={{
                      color: 'var(--light-gray-color)',
                      paddingLeft: '1rem',
                      fontSize: '1.6rem',
                    }}
                  >
                    (2%)
                  </span>
                </div>
                <div className={[classes.Dollar, classes.Light].join(' ')}>{tax}</div>
              </div>
              <div>
                <div>Total</div>
                <div className={classes.Total}>{total}</div>
              </div>
            </div>
            <div className={classes.FormButtonContainer}>
              <div>
                <CheckoutButton
                  cartItems={cart.cart.local.concat(cart.cart.user)}
                  setError={setError}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      cartItems = <TextBody styles={{ fontSize: '1.8rem' }}>No items in your cart</TextBody>
    }
  }

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
        {error && (
          <div className={classes.Cart} style={{ border: 'none' }}>
            <FlashMessage error>{error}</FlashMessage>
          </div>
        )}
        {showForm && (
          <Modal
            top="0"
            left="0"
            show
            onClick={toggleAuthForm}
            styles={{ backgroundColor: 'rgba(0, 0, 0, .15)' }}
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
