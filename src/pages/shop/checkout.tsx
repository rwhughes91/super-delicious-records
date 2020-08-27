import Head from 'next/head'
import classes from '../../styles/pages/shop/Checkout.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Loader from '../../components/UI/Loader/Loader'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'

const stripePromise = loadStripe('pk_test_Atr9C6n5Fm9xGPJJ1alD4rnw003hrw3bcz')

const Checkout: React.FC = () => {
  return (
    <>
      <Head>
        <title>Checkout | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Checkout</PrimaryHeader>
        <div className={classes.CheckoutContainer}>
          <Loader />
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </Layout>
    </>
  )
}

export default Checkout
