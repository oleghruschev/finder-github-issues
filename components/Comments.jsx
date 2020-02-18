import { shape, arrayOf, string, number } from 'prop-types';

import CommentBlock from 'components/CommentBlock';

const Comments = ({ data = [] }) => {
  return data.map(({ body, author, createdAt, id }) => {
    const { login, avatarUrl } = author;

    return (
      <CommentBlock
        key={id}
        body={body}
        login={login}
        avatarUrl={avatarUrl}
        date={createdAt}
      />
    );
  });
};

Comments.propTypes = {
  data: arrayOf(
    shape({
      author: shape({
        login: string.isRequired,
        avatarUrl: string.isRequired,
      }).isRequired,
      body: string.isRequired,
      createdAt: string.isRequired,
      id: string,
    })
  ).isRequired,
};

export default Comments;
