import { useContext } from 'react'
import { bool } from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Controls from 'components/Controls';
import { GET_ISSUES } from '../lib/queries';
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
          {({ loading, errors, data }) => {
            if (errors) return <NotFound>Has erros</NotFound>
            
            if (loading && !dataIssues.length) return (
              <Section>
                <CircularProgress />
              </Section>
            )

            if (!data || !data.repository) {
              return <NotFound>Nothing found on your request</NotFound>
            }

            const { edges, pageInfo: { hasNextPage } } = data.repository.issues;

            if (
              !dataIssues.length ||
              dataIssues[dataIssues.length - 1].cursor !== edges[edges.length - 1].cursor
            ) {
              setDataIssues([...dataIssues, ...edges])
            }

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
                          Load More
                        </button>
                      )
                    )}
                </Section>
              </>
            )
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
