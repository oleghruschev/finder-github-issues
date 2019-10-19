import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { string, func } from 'prop-types';
import Input from '@material-ui/core/Input';
import { useState, useCallback } from 'react';
import { FadeInDownBig } from 'animate-css-styled-components';

import Button from './Button';
import Section from './Section';

const Wrapper = styled.div`
  z-index: -10;
  padding-bottom: 14px;
  border: 1px solid black;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  font-weight: 500;
  box-shadow: 0px 1px 15px -5px;
`;

const InputStyled = styled.div`
  margin: 10px;
`;

const Controls = ({ user, repository, fetchIssueList }) => {
  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState(user);
  const [userIsError, setUserError] = useState(false);
  const [repositoryValue, setRepoValue] = useState(repository);
  const [repositoryIsError, setRepoError] = useState(false);

  const handleUserValue = useCallback(
    e => {
      if (userIsError) setUserError(false);
      setUserValue(e.target.value);
    },
    [userIsError]
  );

  const handleRepoValue = useCallback(
    e => {
      if (repositoryIsError) setRepoError(false);
      setRepoValue(e.target.value);
    },
    [repositoryIsError]
  );

  const getIssues = () => {
    if (!userValue) {
      setUserError(true);
    }

    if (!repositoryValue) {
      setRepoError(true);
    }

    const valuesAreNotEmpty = userValue && repositoryValue;

    if (
      valuesAreNotEmpty &&
      (userValue !== user || repositoryValue !== repository)
    ) {
      dispatch(
        fetchIssueList({ user: userValue, repository: repositoryValue })
      );
    }
  };

  return (
    <FadeInDownBig duration="0.8s" delay="0.2s">
      <Wrapper>
        <Section>
          <InputStyled>
            <Input
              value={userValue}
              placeholder="User"
              onChange={handleUserValue}
              error={userIsError}
            />
          </InputStyled>
          <InputStyled>
            <Input
              value={repositoryValue}
              placeholder="Repository"
              onChange={handleRepoValue}
              error={repositoryIsError}
            />
          </InputStyled>
        </Section>
        <Section>
          <Button onClick={getIssues} value="get issues" />
        </Section>
      </Wrapper>
    </FadeInDownBig>
  );
};

Controls.propTypes = {
  user: string,
  repository: string,
  fetchIssueList: func.isRequired,
};

export default Controls;
