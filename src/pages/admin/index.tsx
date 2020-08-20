import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import classes from '../../styles/pages/admin/Admin.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import AuthForm from '../../components/AuthForm/AuthForm'

const Admin: React.FC = () => {
  const [showAuthForm, setShowAuthForm] = useState(true)

  const toggleAuthForm = () => {
    setShowAuthForm((prevState) => !prevState)
  }

  const forms = (
    <>
      <div className={classes.Title}>Choose a form</div>
      <ul className={classes.List}>
        <li className={classes.ListItem}>
          <Link href="/admin/[pid]" as="/admin/news">
            <button className={classes.Button}>News</button>
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link href="/admin/[pid]" as="/admin/artists">
            <button className={classes.Button}>Artists</button>
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link href="/admin/[pid]" as="/admin/events">
            <button className={classes.Button}>Events</button>
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link href="/admin/[pid]" as="/admin/shop">
            <button className={classes.Button}>Shop</button>
          </Link>
        </li>
      </ul>
    </>
  )
  return (
    <>
      <Head>
        <title>Admin | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Admin</PrimaryHeader>
        {showAuthForm ? <AuthForm onSubmit={toggleAuthForm} /> : forms}
      </Layout>
    </>
  )
}

export default Admin
