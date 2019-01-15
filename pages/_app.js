import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initStore } from 'store';

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

  constructor(props) {
    super(props);

    this.store = initStore(props.isServer, props.initialState);
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
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
