import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const IssuesDataContext = createContext({
  pageCount: 0,
  currentPage: 1,
  user: '',
  repository: '',
  dataIssues: null,
  first: 100,
  setDataIssues: () => {},
});

export default IssuesDataContext;

export const AppProvider = ({ children }) => {
  const [dataIssues, setDataIssues] = useState([]);
  const [user, setUser] = useState('facebook')
  const [repository, setRepository] = useState('react')
  const [after, setAfter] = useState(null)

  return (
    <IssuesDataContext.Provider
      value={{
        user,
        repository,
        dataIssues,
        first: 100,
        after,
        setUser: value => {
          setUser(value)
        },
        setRepository: value => {
          setRepository(value)
        },
        setAfter: value => {
          setAfter(value)
        },
        setDataIssues: value => {
          setDataIssues(value);
        },
      }}
    >
      {children}
    </IssuesDataContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};