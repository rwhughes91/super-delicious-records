import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
  DocumentContext,
  DocumentInitialProps,
} from '../../node_modules/next/dist/next-server/lib/utils'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
