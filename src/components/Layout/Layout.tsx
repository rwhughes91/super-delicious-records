import classes from './Layout.module.scss'
import Head from 'next/head'
import HomeNav from '../Navigation/HomeNav/HomeNav'
import MainNav from '../Navigation/MainNav/MainNav'

import Footer from '../Footer/Footer'
import BreadCrumb from '../Breadcrumb/Breadcrumb'
import UserProvider from '../../context/UserProvider'

interface Props {
  pageType: 'home' | 'main'
  currentPage?: string
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
      <>
        <main className={classes.Main}>
          <div>
            <BreadCrumb currentPage={props.currentPage} />
          </div>
          {props.children}
        </main>
        <footer>
          <Footer />
        </footer>
      </>
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

export default Layout
