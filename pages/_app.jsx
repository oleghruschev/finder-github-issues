import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { object, func } from 'prop-types';
import { useEffect, useState } from 'react';
import withReduxStore from '../lib/withReduxStore';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'config/theme';

const ComponentWrap = ({ pageProps, Component }) => {
  const [isLoadingPage, setLoadingPage] = useState(false);

  const handleOnLoading = () => {
    setLoadingPage(true);
  };

  const handleOffLoading = () => {
    setLoadingPage(false);
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    Router.events.on('routeChangeStart', handleOnLoading);
    Router.events.on('routeChangeComplete', handleOffLoading);
    Router.events.on('routeChangeError', handleOffLoading);
    return () => {
      Router.events.off('routeChangeStart', handleOnLoading);
      Router.events.off('routeChangeComplete', handleOffLoading);
      Router.events.off('routeChangeStart', handleOffLoading);
    };
  }, []);

  return <Component {...pageProps} isLoadingPage={isLoadingPage} />;
};

ComponentWrap.propTypes = {
  pageProps: object,
  Component: func.isRequired,
};

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Head>
          <title>Finder github issues</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ComponentWrap pageProps={pageProps} Component={Component} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
