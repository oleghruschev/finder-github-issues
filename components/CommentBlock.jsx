import styled, { css } from 'styled-components';
import ReactMarkdown from 'react-markdown';

import theme from '../config/theme';

const Wrapper = styled.div`
  margin-top: 40px;
  box-shadow: 0px 1px 15px -5px;
  & > div {
    padding: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 1px solid;
  background: ${theme.palette.light.main};
`;

const Body = styled.div`
  font-weight: 500;

  img {
    width: 100%;
  }

  code {
    white-space: pre-wrap;
  }
`;

const Avatar = styled.img`
  margin-right: 20px;
  width: 40px;
`;

const Footer = styled.div`
  text-align: right;
`;

const CommentBlock = ({ login, data, body, avatarUrl }) => {
  return (
    <Wrapper>
      <Title>
        <Avatar src={avatarUrl}></Avatar>
        {login} comennted on {data}
      </Title>
      <Body>
        <ReactMarkdown source={body} />
      </Body>
      <Footer>like</Footer>
    </Wrapper>
  );
};

export default CommentBlock;
