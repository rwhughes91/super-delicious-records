import Head from 'next/head'
import HomeNav from '../Navigation/HomeNav/HomeNav'
import MainNav from '../Navigation/MainNav/MainNav'

interface Props {
  pageType: 'home' | 'main'
}

const Layout: React.FC<Props> = (props) => {
  let navigation = <MainNav />
  if (props.pageType === 'home') {
    navigation = <HomeNav />
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>{navigation}</header>
      <main>{props.children}</main>
    </>
  )
}

export default Layout
