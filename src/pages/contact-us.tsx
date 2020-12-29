import Head from 'next/head'
import Layout from '@components/Layout/Layout'
import SubmissionPolicy from '@components/SubmissionPolicy/SubmissionPolicy'
import Body from '@components/Layout/Body'

const ContactUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <Body>
          <SubmissionPolicy />
        </Body>
      </Layout>
    </>
  )
}

export default ContactUs
