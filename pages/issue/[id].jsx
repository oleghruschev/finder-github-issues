import React, { useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/Layout';

const Issue = ({ data }) => {
  return (
    <Layout>
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>
        {data.title} <span>#{data.number}</span>
      </h1>
      <p>state: {data.state}</p>
      <p>comments: {data.comments}</p>
      <p>{data.body}</p>
    </Layout>
  );
};

Issue.getInitialProps = async ({ query: { id } }) => {
  const [user, repository, number] = id.split('-');

  const url = `https://api.github.com/repos/${user}/${repository}/issues/${number}`;

  const res = await fetch(url);
  const data = await res.json();

  return { data };
};

export default Issue;
