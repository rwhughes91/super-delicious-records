import { useContext, useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import classes from '@styles/pages/shop/Orders.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AuthForm from '@components/AuthForm/AuthForm'
import ToggleListItem from '@components/TogglieListItem/ToggleListItem'
import CartItem from '@components/Shop/CartItem/CartItem'
import { UserContext } from '@context/UserProvider'
import Loader from '@components/UI/Loader/Loader'
import TextBody from '@components/UI/TextBody/TextBody'
import FetchError from '@components/FetchError/FetchError'
import * as typeDefs from '@generated/graphql'
import { GET_ORDERS } from '@queries/index'
import useCancellableSWR from '@hooks/useCancellableSWR'

interface Order {
  getOrders: typeDefs.Order[]
}

const OrdersList: React.FC = () => {
  const { user, logoutHandler } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const [{ data, error }, cancelFn] = useCancellableSWR<Order>(
    GET_ORDERS,
    user.idToken,
    user.user,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  useEffect(() => {
    if (data && loading) {
      setLoading(false)
    }
  }, [data, loading])

  const togglerLoadingHandler = useCallback(() => {
    setLoading((prevState) => !prevState)
  }, [])

  const logout = useCallback(() => {
    logoutHandler()
    setLoading(false)
    cancelFn('Operation Canceled')
  }, [logoutHandler, cancelFn])

  const noOrders = (
    <TextBody large styles={{ marginBottom: '1rem' }}>
      No orders...yet
    </TextBody>
  )

  const loggedIn = (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
      <button className={classes.LogoutButton} onClick={logout}>
        Logout
      </button>
      {user.admin && (
        <Link href="/admin">
          <button className={classes.AdminButton}>Admin Page</button>
        </Link>
      )}
    </div>
  )

  let output = (
    <div className={classes.FormContainer}>
      <AuthForm onSubmit={togglerLoadingHandler} />
    </div>
  )

  if (!user.errorMessage) {
    if (user.loading || loading || (user.idToken && !data)) {
      output = (
        <>
          <div className={classes.LoaderWrapper}>
            <Loader />
          </div>
          <TextBody large center styles={{ marginTop: '5rem' }}>
            Hold tight while we grab your orders for you
          </TextBody>
          {user.user && loggedIn}
        </>
      )
    }

    if (data || error) {
      let orders
      if (error) {
        orders = <FetchError />
      } else if (data) {
        if (data.getOrders.length === 0) {
          orders = noOrders
        } else {
          orders = (
            <div style={{ maxWidth: '100rem', width: '90%', margin: '0 auto' }}>
              {data.getOrders.map((order: typeDefs.Order, i: number) => {
                let style = {}
                if (i !== 0) {
                  style = { borderTop: 'none' }
                }
                return (
                  <ToggleListItem
                    key={i}
                    title={order.date}
                    secondaryHeader={`$${order.amount}`}
                    styles={{ marginTop: 0, width: '100%' }}
                    buttonStyles={style}
                  >
                    {order.items.map((item: typeDefs.OrderShopItem, i) => {
                      let style = {}
                      if (i + 1 === order.items.length) {
                        style = { borderBottom: 'none' }
                      }
                      return (
                        <CartItem key={i} {...item} styles={{ ...style, paddingTop: 2 }} order />
                      )
                    })}
                  </ToggleListItem>
                )
              })}
            </div>
          )
        }
      }
      output = (
        <>
          <div>{orders}</div>
          {loggedIn}
        </>
      )
    }
  }
  return (
    <>
      <Head>
        <title>Profile | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Orders</PrimaryHeader>
        {output}
      </Layout>
    </>
  )
}

export default OrdersList
