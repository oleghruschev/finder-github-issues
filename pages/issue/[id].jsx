import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import styled, { css } from 'styled-components';

import Layout from 'components/Layout';
import CommentBlock from 'components/CommentBlock';

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

const states = {
  open: '#2cbe4e',
};

const State = styled.span`
  padding: 4px 8px;
  color: #fff;
  ${({ state }) => {
    return css`
      background: ${states[state] || 'red'};
    `;
  }}
`;

const Issue = ({ data, commentsData = [] }) => {
  console.log(data);
  const { title, number, state, comments, body, user = {}, created_at } = data;
  const { login, avatar_url } = user;
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
        {login} opened this issue on {created_at} - {comments} comments
      </SubTitle>
      <CommentBlock
        {...{ body, login, avatarUrl: avatar_url, data: created_at }}
      />
      {Array.isArray(commentsData) &&
        commentsData.map(({ body, user, created_at, id }) => (
          <CommentBlock
            key={id}
            body={body}
            login={user.login}
            avatarUrl={user.avatar_url}
            data={created_at}
          />
        ))}
    </Layout>
  );
};

Issue.getInitialProps = async ({ query: { id } }) => {
  const [user, repository, number] = id.split('-');

  const url = `https://api.github.com/repos/${user}/${repository}/issues/${number}`;
  const commentsUrl = `${url}/comments`;

  const [res, commentsRes] = await Promise.all([
    fetch(url),
    fetch(commentsUrl),
  ]);
  const [data, commentsData] = await Promise.all([
    res.json(),
    commentsRes.json(),
  ]);

  return { data, commentsData };
};

export default Issue;
