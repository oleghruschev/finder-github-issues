import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import theme from '../config/theme';

import Section from 'components/Section';

const headerHeight = '80px';

const Wrapper = styled.div`
  font-size: 14px;
  font-family: ${theme.fontFamily.sansSerif};
  font-weight: 600;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${headerHeight};
  background: ${theme.palette.primary.main};
  font-weight: 700;
`;

const HeaderContent = styled.div`
  margin: 0 auto;
  font-size: 28px;
  color: #fff;
`;

const Content = styled.main`
  margin-top: ${headerHeight};
`;

const Layout = ({ children, isLoadingPage }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header>
            <HeaderContent>Finder github issues</HeaderContent>
          </Header>
          <Container maxWidth="sm">
            <Content>
              {isLoadingPage ? (
                <Section>
                  <CircularProgress />
                </Section>
              ) : (
                children
              )}
            </Content>
          </Container>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
