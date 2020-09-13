import { useEffect } from 'react'
import Head from 'next/head'
import classes from '@styles/pages/shop/Success.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import FlashMessage from '@components/FlashMessage/FlashMessage'
import Text from '@components/UI/Text/Text'

const Success: React.FC = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <>
      <Head>
        <title>Success | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" noCrumb>
        <PrimaryHeader styles={{ fontFamily: 'Open Sans Regular', marginTop: '7.5rem' }}>
          Thank you!
        </PrimaryHeader>
        <div className={classes.Container}>
          <FlashMessage success>Your order has been placed!</FlashMessage>
          <Text styles={{ marginTop: '3rem' }}>
            We appreciate your business! If you have any questions, please email
            <a
              href="mailto:orders@example.com"
              style={{ textDecoration: 'none', color: 'var(--bright-red-color)' }}
            >
              {' '}
              orders@superdeliciousrecords.com
            </a>
            .
          </Text>
        </div>
      </Layout>
    </>
  )
}

export default Success
