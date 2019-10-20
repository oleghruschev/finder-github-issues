import theme from 'config/theme';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { number, bool, func } from 'prop-types';

const Wrapper = styled.div`
  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    border-radius: 8px;
    padding: 10px 20px;
    background: ${theme.palette.light.main};
    list-style-type: none;
    font-weight: 600;
    outline: none;
    user-select: none;
    ${({ isLoading }) =>
      isLoading &&
      css`
        pointer-events: none;
      `}
    li {
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: ${theme.palette.secondary.main};
      }
      a {
        padding: 4px 8px;
        &:focus {
          outline: none;
        }
      }
      &.selected {
        border: 1px solid;
        outline: none;
      }
    }
  }
`;

const Pagination = ({ pageCount, fetchIssueList, isLoading }) => {
  const dispatch = useDispatch();
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(2);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    const breakPoint = 600;

    if (width < breakPoint && pageRangeDisplayed) {
      setPageRangeDisplayed(0);
      setMarginPagesDisplayed(0);
    } else if (width >= breakPoint && !pageRangeDisplayed) {
      setPageRangeDisplayed(3);
      setMarginPagesDisplayed(2);
    }
  }, [width]);

  const onPageChange = ({ selected }) => {
    dispatch(fetchIssueList({ page: selected + 1 }));
  };

  return (
    <Wrapper isLoading={isLoading}>
      <ReactPaginate
        {...{
          onPageChange,
          pageCount,
          pageRangeDisplayed,
          marginPagesDisplayed,
        }}
      />
    </Wrapper>
  );
};

Pagination.propTypes = {
  isLoading: bool.isRequired,
  pageCount: number.isRequired,
  fetchIssueList: func.isRequired,
};

export default Pagination;
