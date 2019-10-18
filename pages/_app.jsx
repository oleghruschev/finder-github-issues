import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import withReduxStore from '../lib/with-redux-store';
import CssBaseline from '@material-ui/core/CssBaseline';

const ComponentWrap = ({ pageProps, Component }) => {
  const [isLoadingPage, setLoadingPage] = useState(false);

  const handleOnLoading = () => {
    setLoadingPage(true);
  };

  const handleOffLoading = () => {
    setLoadingPage(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handleOnLoading);
    Router.events.on('routeChangeComplete', handleOffLoading);
    Router.events.on('routeChangeError', handleOffLoading);
    return () => {
      Router.events.off('routeChangeStart', handleOnLoading);
      Router.events.off('routeChangeComplete', handleOffLoading);
      Router.events.off('routeChangeStart', handleOffLoading);
    };
  }, []);

  return (
    <>
      <Component {...pageProps} isLoadingPage={isLoadingPage} />
    </>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Head>
          <title>Finder github issues</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        </Head>
        <CssBaseline />
        <ComponentWrap pageProps={pageProps} Component={Component} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
