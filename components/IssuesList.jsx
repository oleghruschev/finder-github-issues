import Link from 'next/link';
import styled from 'styled-components';
import { string, arrayOf, object } from 'prop-types';

import theme from 'config/theme';

import commentIco from 'static/img/comment.png';

const CustomLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid;
  border-radius: 8px;
  color: ${theme.palette.text.main};
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0px 1px 15px -5px;
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
    <div>
      {data.map(({ node: { title, number, comments, id } }) => {
        let comentsLength = comments.edges.length;
        
        if (comentsLength === 100) comentsLength = '99+'

        return <Link
          key={id}
          href="issue/[id]"
          as={`issue/${user}-${repository}-${number}`}
        >
          <CustomLink>
            <div>
              <Number>{`#${number}`}</Number>
              {title}
            </div>
            {comentsLength !== 0 && (
              <Comment>
                <img src={commentIco} alt="" />
                {comentsLength}
              </Comment>
            )}
          </CustomLink>
        </Link>
      })}
    </div>
  );
};

IssuesList.propTypes = {
  data: arrayOf(object),
  user: string.isRequired,
  repository: string.isRequired,
};

export default IssuesList;
