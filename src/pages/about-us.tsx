import Head from 'next/head'
import AboutUs from '../components/pages/AboutUs/AboutUs'

const aboutUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us | SDR</title>
      </Head>
      <AboutUs />
    </>
  )
}

export default aboutUs
