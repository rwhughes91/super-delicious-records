import Head from 'next/head'
import Layout from '@components/Layout/Layout'
import SubmissionPolicy from '@components/SubmissionPolicy/SubmissionPolicy'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import ContactForm from '@components/ContactForm/ContactForm'

const ContactUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <SubmissionPolicy />
        <PrimaryHeader>Contact Us</PrimaryHeader>
        <SecondaryHeader>
          <p>
            If you’d like to reach us for anything other than submissions, please send an email to{' '}
            <a
              style={{
                color: 'var(--bright-red-color)',
                textDecoration: 'none',
              }}
              href="mailto://submissions@superdeliciousrecords.com"
            >
              info@superdeliciousrecords.com
            </a>
            , or fill out the form below.
          </p>
        </SecondaryHeader>
        <ContactForm />
      </Layout>
    </>
  )
}

export default ContactUs
