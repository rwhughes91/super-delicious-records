import React from 'react'
import classes from './Layout.module.scss'
import Head from 'next/head'
import HomeNav from '../Navigation/HomeNav/HomeNav'
import MainNav from '../Navigation/MainNav/MainNav'
import Footer from '../Footer/Footer'
import BreadCrumb from '../Breadcrumb/Breadcrumb'

type children = JSX.Element | boolean | null | undefined | string
interface Props {
  pageType: 'home' | 'main'
  currentPage?: string
  children: children | children[]
  noFooter?: boolean
}

const Layout: React.FC<Props> = (props) => {
  let navigation = <MainNav />
  if (props.pageType === 'home') {
    navigation = <HomeNav />
  }

  const output =
    props.pageType === 'home' ? (
      <main>{props.children}</main>
    ) : (
      <div className={classes.Main}>
        <main className={classes.Content}>
          <div>
            <BreadCrumb currentPage={props.currentPage} />
          </div>
          {props.children}
        </main>
        {!props.noFooter && (
          <footer className={classes.Footer}>
            <Footer />
          </footer>
        )}
      </div>
    )
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>{navigation}</header>
      {output}
    </>
  )
}

export default React.memo(Layout)
