import { AppProps } from 'next/app'
import UserProvider from '../context/UserProvider'
import CartProvider from '@context/CartProvider'

import '@styles/fonts.scss'
import '@styles/styles.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <UserProvider>
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  </UserProvider>
)

export default App
