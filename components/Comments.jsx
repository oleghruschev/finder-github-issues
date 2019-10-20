import { shape, arrayOf, string, number } from 'prop-types';

import CommentBlock from 'components/CommentBlock';

const Comments = ({ data = [] }) => {
  return data.map(({ body, user, created_at, id }) => {
    const { login, avatar_url } = user;

    return (
      <CommentBlock
        key={id}
        body={body}
        login={login}
        avatarUrl={avatar_url}
        date={created_at}
      />
    );
  });
};

Comments.propTypes = {
  data: arrayOf(
    shape({
      user: shape({
        login: string.isRequired,
        avatar_url: string.isRequired,
      }).isRequired,
      body: string.isRequired,
      created_at: string.isRequired,
      id: number,
    })
  ).isRequired,
};

export default Comments;
