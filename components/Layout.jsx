import styled from 'styled-components';
import { node, bool } from 'prop-types';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import theme from 'config/theme';

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
  margin: ${headerHeight} 0;
`;

const Layout = ({ children, isLoadingPage }) => {
  return (
    <Wrapper>
      <Header>
        <HeaderContent>Finder github issues</HeaderContent>
      </Header>
      <Container maxWidth="md">
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
  );
};

Layout.propTypes = {
  children: node.isRequired,
  isLoadingPage: bool,
};

export default Layout;
