import { useContext } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { UserContext } from '../context/UserProvider'
import { GraphQLClient } from 'graphql-request'
import * as genTypes from '@generated/graphql'

import { GET_ORDERS, CREATE_ORDER } from '@queries/index'

// import { getUsersCartItemsWithShopItem } from '@services/firebase/admin'

const HomePage: React.FC = () => {
  const { user } = useContext(UserContext)

  const addData = () => {
    const client = new GraphQLClient('/api/graphql')
    if (user.user) {
      client.setHeader('authorization', `Bearer ${user.idToken}`)
    }
    const variables = {
      data: orders[0],
    }
    client
      .request(CREATE_ORDER, variables)
      .then((res) => {
        console.log('data: ', res)
      })
      .catch((res) => {
        console.log('error: ', res)
      })
  }
  const getData = () => {
    const client = new GraphQLClient('/api/graphql')
    if (user.user) {
      client.setHeader('authorization', `Bearer ${user.idToken}`)
    }
    client
      .request(GET_ORDERS)
      .then((res) => {
        console.log('data: ', res)
      })
      .catch((res) => {
        console.log('error: ', res)
      })
  }

  return (
    <>
      <Head>
        <title>Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <div>{(user && user.user && user.user.uid) || 'Not Logged in'}</div>
        <div>{(user && user.admin && 'True') || 'False'}</div>
        <button onClick={addData}>Add data</button>
        <button onClick={getData}>GET data</button>
      </Layout>
    </>
  )
}

export default HomePage

const orders = [
  {
    date: '8/12/2020',
    currency: 'USD',
    amount: 100,
    items: [
      {
        shopPid: '',
        qty: 2,
        purchasePrice: 14.99,
        color: 'black',
        size: genTypes.Size.Small,
        shopItem: {
          name: 'Super Delicious T Shirt',
          price: 14.99,
          images: [
            {
              imageUrl: '',
              imageSetUrl: '',
              alt: '',
              color: 'black',
            },
          ],
        },
      },
    ],
  },
]
