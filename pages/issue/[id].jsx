import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import styled, { css } from 'styled-components';
import { shape, arrayOf, string, number, bool, object } from 'prop-types';

import theme from 'config/theme';
import formateDate from 'helpers/formateDate';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Comments from 'components/Comments';
import CommentBlock from 'components/CommentBlock';

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

const Issue = ({ data, commentsData, hasError }) => {
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
      <Link href="/">
        <CustomLink>{`<- Back`}</CustomLink>
      </Link>
      <Title>
        {title} <Number>#{number}</Number>
      </Title>
      <State state={state}>{state}</State>
      <SubTitle>
        {login} opened this issue on {createdDate} - {comments} comments
      </SubTitle>
      <CommentBlock
        {...{ body, login, avatarUrl: avatar_url, date: created_at }}
      />
      <Comments data={commentsData} />
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
    console.error(err);
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
      avatar_url: string.isRequired,
    }).isRequired,
  }).isRequired,
  commentsData: arrayOf(object).isRequired,
  hasError: bool.isRequired,
};

export default Issue;
