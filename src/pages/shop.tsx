import Head from 'next/head'
import Shop from '../components/pages/Shop/Shop'

const shop: React.FC = () => {
  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Shop />
    </>
  )
}

export default shop
