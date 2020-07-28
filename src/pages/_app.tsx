import { AppProps } from 'next/app'

import '../styles/fonts.scss'
import '../styles/styles.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />

export default App
