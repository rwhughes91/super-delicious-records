import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { UserContext } from '../context/UserProvider'

import { GET_NEWS_ITEM, GET_NEWS_ITEMS } from '../queries/news'

import { request } from 'graphql-request'
import useSWR from 'swr'

const HomePage: React.FC = () => {
  // const { data } = useSWR(GET_NEWS_ITEMS, (query) => request('/api/graphql', query))

  // const variables = {
  //   pid: '-MFgIiHO--BwBI623t3Z',
  // }
  // const { data } = useSWR(GET_NEWS_ITEM, (query) => request('/api/graphql', query, variables))

  const user = useContext(UserContext)

  return (
    <>
      <Head>
        <title>Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <div>{(user && user.user && user.user.uid) || 'Not Logged in'}</div>
      </Layout>
    </>
  )
}

export default HomePage
