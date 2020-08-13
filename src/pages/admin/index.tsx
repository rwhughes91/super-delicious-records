import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import Loader from '../../components/UI/Loader/Loader'

const Admin: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Admin</PrimaryHeader>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </div>
      </Layout>
    </>
  )
}

export default Admin
