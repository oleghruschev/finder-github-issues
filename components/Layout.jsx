import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import theme from '../theme';

const Wrapper = styled.div`
  font-size: 14px;
  font-family: ${theme.fontFamily.sansSerif};
  font-weight: 600;
`;

const Header = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 80px;
  background: ${theme.palette.primary.main};
  font-weight: 700;
`;

const HeaderContent = styled.div`
  margin: 0 auto;
  font-size: 28px;
  color: #fff;
`;

const Layout = ({ children }) => {
  const title = 'Finder github issues';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header>
            <HeaderContent>{title}</HeaderContent>
          </Header>
          <Container maxWidth="sm">{children}</Container>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
