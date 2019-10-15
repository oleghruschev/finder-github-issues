import {
  SET_USER,
  SET_ISSUES_RESULT,
  SET_PAGE_COUNT,
  SET_ISSUES_LOADING,
} from './actionTypes';

const setIssuesData = payload => ({
  type: SET_ISSUES_RESULT,
  payload,
});

const setPageCount = payload => ({
  type: SET_PAGE_COUNT,
  payload,
});

const setLoading = payload => ({
  type: SET_ISSUES_LOADING,
  payload,
});

const setUser = (user, repository) => ({
  type: SET_USER,
  user,
  repository,
});

export const fetchIssueList = ({ page = 1, user, repository }) => async (
  dispatch,
  getState
) => {
  const baseUrl = 'https://api.github.com/repos';
  const perPage = 10;
  const userValue = user || getState().issueList.user;
  const reppositoryValue = repository || getState().issueList.repository;

  const getPageCount = async () => {
    const res = await fetch(`${baseUrl}/${userValue}/${reppositoryValue}`);
    const { open_issues_count } = await res.json();
    const pageCount = Math.ceil(open_issues_count / perPage);

    dispatch(setPageCount(pageCount));
  };

  dispatch(setLoading(true));

  try {
    await getPageCount();
    dispatch(setUser(userValue, reppositoryValue));

    const res = await fetch(
      `${baseUrl}/${userValue}/${reppositoryValue}/issues?page=${page}&per_page=${perPage}`
    );
    const data = await res.json();

    dispatch(setIssuesData(data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};
