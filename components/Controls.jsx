import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Input from '@material-ui/core/Input';
import React, { useState, useCallback } from 'react';
import { FadeInDownBig } from 'animate-css-styled-components';

import theme from '../config/theme';
import Section from './Section';

const Wrapper = styled.div`
  z-index: -10;
  padding-bottom: 14px;
  border: 2px solid black;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 10px;
  background: #fff;
  border: 1px solid ${theme.palette.secondary.main};
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  user-select: none;

  &:hover {
    background: ${theme.palette.secondary.main};
  }
`;

const InputWrap = styled.div`
  margin: 10px;
`;

const Controls = ({ user, repository, fetchIssueList }) => {
  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState(user);
  const [userIsError, setUserError] = useState(false);
  const [repositoryValue, setRepoValue] = useState(repository);
  const [repositoryIsError, setRepoError] = useState(false);

  const handleUserValue = useCallback(e => {
    if (userIsError) setUserError(false);
    setUserValue(e.target.value);
  });

  const handleRepoValue = useCallback(e => {
    if (repositoryIsError) setRepoError(false);
    setRepoValue(e.target.value);
  });

  const getIssues = useCallback(() => {
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
  });

  return (
    <FadeInDownBig duration="0.8s" delay="0.2s">
      <Wrapper>
        <Section>
          <InputWrap>
            <Input
              value={userValue}
              placeholder="User"
              onChange={handleUserValue}
              error={userIsError}
            />
          </InputWrap>
          <InputWrap>
            <Input
              value={repositoryValue}
              placeholder="Repository"
              onChange={handleRepoValue}
              error={repositoryIsError}
            />
          </InputWrap>
        </Section>
        <Section>
          <Button onClick={getIssues}>get issues</Button>
        </Section>
      </Wrapper>
    </FadeInDownBig>
  );
};

export default Controls;
