import React, { useState, useContext, useCallback } from 'react'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '@context/UserProvider'
import { STRIPE_CREATE_ORDER } from '@queries/index'
import * as typeDefs from '@generated/graphql'
import sendAxiosRequest from '@utils/sendAxios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

interface Props {
  cartItems: typeDefs.CartItemInput[]
  setError: (x: string) => void
}

const CheckoutButton: React.FC<Props> = (props) => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const { setError } = props

  const checkoutHandler = useCallback(async () => {
    setLoading(true)
    const stripe = await stripePromise
    const [request] = sendAxiosRequest(STRIPE_CREATE_ORDER, user.user || undefined, {
      data: props.cartItems,
    })
    const response = await request()
    const id = response.stripeCreateOrder.id
    const result = await stripe
      ?.redirectToCheckout({
        sessionId: id,
      })
      .catch((error) => {
        setLoading(false)
        setError(
          error.message ||
            'Oops. We are having trouble processing your checkout. Are you connected to the internet?'
        )
      })
    if (result && result.error) {
      setLoading(false)
      setError(
        result.error.message ||
          'Oops. We are having trouble processing your checkout. Are you connected to the internet?'
      )
    }
  }, [props.cartItems, setError, user.user])

  return (
    <FormButton onClick={checkoutHandler} loading={loading}>
      Checkout
    </FormButton>
  )
}

export default React.memo(CheckoutButton)
