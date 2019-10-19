import { bool } from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchIssueList } from '../store/actions/fetchIssueList';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Controls from 'components/Controls';
import IssuesList from 'components/IssuesList';
import Pagination from 'components/Pagination';

const NotFound = styled.p`
  margin: 20px 0;
  text-align: center;
  font-weight: 600;
`;

const Index = ({ isLoadingPage }) => {
  const { user, repository, pageCount, isLoading, data } = useSelector(
    state => ({ ...state.issueList })
  );

  return (
    <Layout isLoadingPage={isLoadingPage}>
      <Controls {...{ user, repository, fetchIssueList }} />
      {pageCount > 1 && (
        <Section>
          <Pagination {...{ pageCount, fetchIssueList, isLoading }} />
        </Section>
      )}
      <Section>
        {isLoading ? (
          <CircularProgress />
        ) : Array.isArray(data) ? (
          <IssuesList
            {...{
              data,
              user,
              repository,
            }}
          />
        ) : (
          <NotFound>Nothing found on your request</NotFound>
        )}
      </Section>
    </Layout>
  );
};

Index.propTypes = {
  isLoadingPage: bool,
};

export default Index;
