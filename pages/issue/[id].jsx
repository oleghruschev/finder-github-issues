import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLazyQuery  } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { shape, arrayOf, string, number, bool, object } from 'prop-types';

import theme from 'config/theme';
import formateDate from 'helpers/formateDate';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Comments from 'components/Comments';
import CommentBlock from 'components/CommentBlock';
import { GET_ISSUE_DETAIL, GET_COMMENTS } from '../../lib/queries';

const states = {
  open: '#2cbe4e',
  closed: '#b60205',
};

const CustomLink = styled.a`
  line-height: 4;
  cursor: pointer;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

const Number = styled.span`
  color: #9f9f9f;
`;

const Title = styled.h1`
  font-weight: 600;
  margin: 0 0 4px;
`;

const SubTitle = styled.span`
  margin-left: 10px;
  font-weight: 500;
`;

const State = styled.span`
  padding: 4px 8px;
  color: #fff;
  ${({ state }) => {
    return css`
      background: ${states[state] || '#9f9f9f'};
    `;
  }}
`;

const Issue = ({ data, hasError, user, repository, issueNumber }) => {
  if (hasError)
    return (
      <Layout>
        <Section>An error occurred</Section>
      </Layout>
    );

  const [hasMore, setHasMore] = useState(false)  
  const [commentsData, setCommentsData] = useState([])

  useEffect(() => {
    const comments = data.comments.edges.map(comment => ({
      cursor: comment.cursor,
      ...comment.node
    }));
  
    setHasMore(data.comments.pageInfo.hasNextPage)
    setCommentsData(comments)
  }, [])

  const [getMoreComments, { loading, data: newData }] = useLazyQuery(GET_COMMENTS);

  if (newData) {
    const moreComments = newData.repository.issue.comments.edges.map(comment => ({
      cursor: comment.cursor,
      ...comment.node
    }));

    if (
      commentsData[commentsData.length - 1].cursor !==
      moreComments[moreComments.length - 1].cursor
    ) {
      setHasMore(newData.repository.issue.comments.pageInfo.hasNextPage)
      setCommentsData([ ...commentsData, ...moreComments ])
    }
  }

  const { title, number, state, body, author = {}, createdAt } = data;
  const { login, avatarUrl } = author;
  const createdDate = formateDate(createdAt);

  return (
    <Layout>
      <Link href="/">
        <CustomLink>{`<- Back`}</CustomLink>
      </Link>
      <Title>
        {title} <Number>#{number}</Number>
      </Title>
      <State state={state}>{state}</State>
      <SubTitle>
        {login} opened this issue on {createdDate} - {commentsData.length} comments
      </SubTitle>
      <CommentBlock
        {...{ body, login, avatarUrl: avatarUrl, date: createdAt }}
      />
      <Comments data={commentsData} />
      {hasMore && (
        <Section>
          {loading ? (
            <CircularProgress />
          ) : (
            <button onClick={() => {
              getMoreComments({
                variables: {
                  owner: user,
                  name: repository,
                  number: issueNumber,
                  countComments: 20,
                  after: commentsData[commentsData.length - 1].cursor,
                }
              })
            }}>
              Load More
            </button>
          )}
        </Section>
      )}
    </Layout>
  );
};

Issue.getInitialProps = async ({ query: { id }, apolloClient }) => {
  try {
    const [user, repository, number] = id.split('-');
    const { data } = await apolloClient
      .query({ query: GET_ISSUE_DETAIL, variables: {
        owner: user,
        name: repository,
        number: + number,
        countComments: 20
      }})

    return {
      data: data.repository.issue,
      hasError: false,
      user,
      repository,
      issueNumber: + number,
    }
  } catch (err) {
    return { hasError: true };
  }
};

Issue.propTypes = {
  data: shape({
    title: string.isRequired,
    number: number.isRequired,
    comments: shape({
      pageInfo: shape({
        hasNextPage: bool.isRequired
      }).isRequired,
      edges: arrayOf(
        shape({
          cursor: string.isRequired,
          node: object.isRequired
        }).isRequired,
      ).isRequired,
    }),
    body: string.isRequired,
    createdAt: string.isRequired,
    author: shape({
      login: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
  }).isRequired,
  user: string.isRequired,
  repository: string.isRequired,
  issueNumber: number.isRequired,
  hasError: bool.isRequired,
};

export default Issue;
