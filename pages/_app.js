import React from 'react';
import App, { Container } from 'next/app';
import * as Sentry from '@sentry/browser';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initStore } from 'store';
import { SENTRY_PUBLIC_DSN } from 'env';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </div>
    );
  }
}

export default class MyApp extends App {
  constructor(props) {
    super(props);

    if (SENTRY_PUBLIC_DSN) {
      Sentry.init({
        dsn: SENTRY_PUBLIC_DSN,
      });
    }

    this.store = initStore(props.isServer, props.initialState);
  }

  static async getInitialProps({ Component, ctx, req }) {
    const isServer = !!req;
    const store = initStore(isServer);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      initialState: getSnapshot(store),
      pageProps,
      isServer,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (SENTRY_PUBLIC_DSN) {
      Sentry.configureScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
      });
      Sentry.captureException(error);
    }

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const {
      Component,
      pageProps,
    } = this.props;

    return (
      <Container>
        <Provider store={this.store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}
