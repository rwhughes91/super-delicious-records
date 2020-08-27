import { AppProps } from 'next/app'
import UserProvider from '../context/UserProvider'

import '../styles/fonts.scss'
import '../styles/styles.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default App
