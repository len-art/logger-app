import React from 'react'
import App, { Container } from 'next/app'
import * as Sentry from '@sentry/browser'
import { Provider } from 'mobx-react'
import { format } from 'date-fns'
import Store from '../store'
// import { SENTRY_PUBLIC_DSN } from 'env';

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className="layout">
        <header>Header</header>
        {children}
        <footer className="footer">
          {/* past 12 months */}
          {Array.from(new Array(12), (_, i) => {
            const month = (11 - i + 1) % 12
            const date = new Date(2010, month, 1)
            return <button key={month}>{format(date, 'MMM')}</button>
          })}
        </footer>
        <style jsx>
          {`
            .footer {
              position: fixed;
              padding: 20px;
              bottom: 0;
              left: 0;
              display: flex;
            }
          `}
        </style>
      </div>
    )
  }
}

export default class MyApp extends App {
  constructor(props) {
    super(props)

    // if (SENTRY_PUBLIC_DSN) {
    //   Sentry.init({
    //     dsn: SENTRY_PUBLIC_DSN,
    //   });
    // }

    this.store = new Store() // initStore(props.isServer, props.initialState);
  }

  static async getInitialProps({ Component, ctx, req }) {
    const isServer = !!req
    // const store = initStore(isServer);

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      // initialState: getSnapshot(store),
      pageProps,
      isServer,
    }
  }

  componentDidCatch(error, errorInfo) {
    // if (SENTRY_PUBLIC_DSN) {
    //   Sentry.configureScope((scope) => {
    //     Object.keys(errorInfo).forEach((key) => {
    //       scope.setExtra(key, errorInfo[key]);
    //     });
    //   });
    //   Sentry.captureException(error);
    // }

    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider store={this.store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}
