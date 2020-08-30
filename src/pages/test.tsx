import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { UserContext } from '../context/UserProvider'
import { GraphQLClient } from 'graphql-request'
import * as genTypes from '@generated/graphql'

import { CREATE_SHOP_ITEM, GET_SHOP } from '@queries/index'

const HomePage: React.FC = () => {
  const user = useContext(UserContext)

  const addData = () => {
    const client = new GraphQLClient('/api/graphql')
    if (user.user) {
      client.setHeader('authorization', `Bearer ${user.idToken}`)
    }
    const variables = {
      data: items[0],
    }
    client
      .request(CREATE_SHOP_ITEM, variables)
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
      .request(GET_SHOP)
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

const images = [
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'black',
  },
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'gray',
  },
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'white',
  },
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'green',
  },
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'red',
  },
  {
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    alt: 't-shirt',
    color: 'blue',
  },
]

const items: genTypes.ShopItemInput[] = [
  {
    name: `Super Delicious T-Shirt`,
    price: 14.99,
    description: `You’ve now found the staple t-shirt of your wardrobe. It’s made of a thicker, heavier
    cotton, but it’s still soft and comfy. And the double stitching on the neckline and
    sleeves add more durability to what is sure to be a favorite!`,
    qtyAvailable: 2,
    tag: genTypes.Tag.Shirt,
    images: images,
    colors: ['black', 'gray', 'white', 'green', 'red', 'blue'],
  },
]
