import App from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
        <CssBaseline />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
