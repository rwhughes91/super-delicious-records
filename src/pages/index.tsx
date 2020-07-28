import Head from 'next/head'

import Home from '../components/Home/Home'

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Super Delicious Records</title>
      </Head>
      <Home />
    </>
  )
}

export default HomePage
