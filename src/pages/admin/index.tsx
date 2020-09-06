import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import classes from '@styles/pages/admin/Admin.module.scss'
import AdminLayout from '@components/Layout/AdminLayout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'

const Admin: React.FC = () => {
  const forms = (
    <ul className={classes.List}>
      <li className={classes.ListItem}>
        <Link href="/admin/news">
          <button className={classes.Button}>News</button>
        </Link>
      </li>
      <li className={classes.ListItem}>
        <Link href="/admin/artists">
          <button className={classes.Button}>Artists</button>
        </Link>
      </li>
      <li className={classes.ListItem}>
        <Link href="/admin/events">
          <button className={classes.Button}>Events</button>
        </Link>
      </li>
      <li className={classes.ListItem}>
        <Link href="/admin/shop">
          <button className={classes.Button}>Shop</button>
        </Link>
      </li>
    </ul>
  )
  return (
    <>
      <Head>
        <title>Admin | Super Delicious Records</title>
      </Head>
      <AdminLayout>
        <PrimaryHeader>Admin</PrimaryHeader>
        {forms}
      </AdminLayout>
    </>
  )
}

export default React.memo(Admin)
