import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import styled, { css } from 'styled-components';
import { shape, arrayOf, string, number, bool } from 'prop-types';

import formateDate from 'helpers/formateDate';

import Layout from 'components/Layout';
import Section from 'components/Section';
import CommentBlock from 'components/CommentBlock';

const states = {
  open: '#2cbe4e',
  closed: '#b60205',
};

const Number = styled.span`
  color: #9f9f9f;
`;

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 4px;
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

const Issue = ({ data, commentsData = [], hasError }) => {
  if (hasError)
    return (
      <Layout>
        <Section>An error occurred</Section>
      </Layout>
    );

  const { title, number, state, comments, body, user = {}, created_at } = data;
  const { login, avatar_url } = user;

  const createdDate = formateDate(created_at);

  return (
    <Layout>
      <p>
        <Link href="/">Back</Link>
      </p>
      <Title>
        {title} <Number>#{number}</Number>
      </Title>
      <span></span>
      <State state={state}>{state}</State>
      <SubTitle>
        {login} opened this issue on {createdDate} - {comments} comments
      </SubTitle>
      <CommentBlock
        {...{ body, login, avatarUrl: avatar_url, date: created_at }}
      />
      {Array.isArray(commentsData) &&
        commentsData.map(({ body, user, created_at, id }) => (
          <CommentBlock
            key={id}
            body={body}
            login={user.login}
            avatarUrl={user.avatar_url}
            date={created_at}
          />
        ))}
    </Layout>
  );
};

Issue.getInitialProps = async ({ query: { id } }) => {
  const [user, repository, number] = id.split('-');

  const url = `https://api.github.com/repos/${user}/${repository}/issues/${number}`;
  const commentsUrl = `${url}/comments`;

  try {
    const [res, commentsRes] = await Promise.all([
      fetch(url),
      fetch(commentsUrl),
    ]);
    const [data, commentsData] = await Promise.all([
      res.json(),
      commentsRes.json(),
    ]);

    return { data, commentsData, hasError: false };
  } catch (err) {
    // console.error(err);
    return { hasError: true };
  }
};

Issue.propTypes = {
  data: shape({
    title: string.isRequired,
    number: number.isRequired,
    comments: number.isRequired,
    body: string.isRequired,
    created_at: string.isRequired,
    user: shape({
      login: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
  }).isRequired,
  commentsData: arrayOf(
    shape({
      user: string.isRequired,
      body: string.isRequired,
      created_at: string.isRequired,
      id: number,
    }).isRequired
  ).isRequired,
  hasError: bool.isRequired,
};

export default Issue;
