import {
  SET_USER,
  SET_PAGE_COUNT,
  SET_ISSUES_RESULT,
  SET_ISSUES_LOADING,
} from '../actions/actionTypes';

const initialState = {
  user: '',
  repository: '',
  data: [],
  isLoading: false,
  pageCount: 1,
};

const issueList = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user, repository: action.repository };
    case SET_ISSUES_RESULT:
      return { ...state, data: action.payload };
    case SET_PAGE_COUNT:
      return { ...state, pageCount: action.payload };
    case SET_ISSUES_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default issueList;
