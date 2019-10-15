import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import theme from '../config/theme';

const Issues = styled.div``;

const CustomLink = styled.a`
  display: block;
  color: ${theme.palette.text.main};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    color: ${theme.palette.primary.main};
  }
`;

const Number = styled.span`
  margin-right: 10px;
  font-weight: 500;
  color: #9f9f9f;
`;

const IssuesList = ({ data = [], user, repository }) => {
  if (!data.length) return null;

  return (
    <Issues>
      {data.map(({ title, number }, index) => (
        <Link
          key={index}
          href="issue/[id]"
          as={`issue/${user}-${repository}-${number}`}
        >
          <CustomLink>
            <p>
              <Number>{`#${number}`}</Number>
              {title}
            </p>
          </CustomLink>
        </Link>
      ))}
    </Issues>
  );
};

export default IssuesList;
