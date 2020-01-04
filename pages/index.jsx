import { useContext } from 'react'
import { bool } from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Query } from 'react-apollo';
import { GET_ISSUES } from '../lib/queries';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Controls from 'components/Controls';
import IssuesList from 'components/IssuesList';
import IssuesDataContext from 'components/Context'

const NotFound = styled.p`
  margin: 20px 0;
  text-align: center;
  font-weight: 600;
`;

const Index = (props) => {
  const { isLoadingPage } = props
  const { user, repository, first, after, setAfter, dataIssues, setDataIssues } = useContext(IssuesDataContext);

  return (
    <Layout isLoadingPage={isLoadingPage}>
      <Controls />
      {user && repository && (
        <Query
          query={GET_ISSUES}
          variables={{
            owner: user,
            name: repository,
            first,
            after,
          }}
        >
          {({ loading, data }) => {
            if (loading && !dataIssues.length) return (
              <Section>
                <CircularProgress />
              </Section>
            )

            const { edges, pageInfo: { hasNextPage } } = data.repository.issues;

            if (
              !dataIssues.length ||
              dataIssues[dataIssues.length - 1].cursor !== edges[edges.length - 1].cursor
            ) {
              setDataIssues([...dataIssues, ...edges])
            }

            if (Array.isArray(dataIssues)) {
              return (
                <>
                  <Section>
                    <IssuesList
                      {...{
                        data: dataIssues,
                        user,
                        repository,
                      }} />
                      {hasNextPage && (
                        loading ? (
                          <Section>
                            <CircularProgress />
                          </Section>
                        ) : (
                          <button onClick={() => {
                            setAfter(dataIssues[dataIssues.length - 1].cursor)
                          }}>
                            Show more
                          </button>
                        )
                      )}
                  </Section>
                </>
              )
            } else {
              return (
                <NotFound>Nothing found on your request</NotFound>
              )
            }
          }}
        </Query>
      )}
    </Layout>
  );
};

Index.propTypes = {
  isLoadingPage: bool,
};

export default Index;
