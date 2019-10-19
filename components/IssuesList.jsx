import Link from 'next/link';
import styled from 'styled-components';

import theme from '../config/theme';

import commentIco from 'assets/img/comment.png';

const Issues = styled.div``;

const CustomLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
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

const Comment = styled(Number)`
  margin-right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;

  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
`;

const IssuesList = ({ data = [], user, repository }) => {
  if (!data.length) return null;

  return (
    <Issues>
      {data.map(({ title, number, comments }, index) => (
        <Link
          key={index}
          href="issue/[id]"
          as={`issue/${user}-${repository}-${number}`}
        >
          <CustomLink>
            <div>
              <Number>{`#${number}`}</Number>
              {title}
            </div>
            {comments > 0 && (
              <Comment>
                <img src={commentIco} alt="" />
                {comments}
              </Comment>
            )}
          </CustomLink>
        </Link>
      ))}
    </Issues>
  );
};

export default IssuesList;
