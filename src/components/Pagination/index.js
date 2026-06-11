/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BSPagination from 'react-bootstrap/Pagination';
import styled from 'styled-components';
import './Pagination.css';
import FirstDisabledIconImg from './first_disabled.svg';
import PrevDisabledIconImg from './prev_disabled.svg';
import NextDisabledIconImg from './next_disabled.svg';
import LastDisabledIconImg from './last_disabled.svg';
import FirstIconImg from './first.svg';
import PrevIconImg from './prev.svg';
import NextIconImg from './next.svg';
import LastIconImg from './last.svg';

const PaginationContainer = styled.div`
  display: flex;
  float: right;
  align-items: center;
  align-content: center;
`;

const ResultsPerPage = styled.div`
  margin: 0 12px 7px 0;
  font-family: Lato;
  font-size: 15px;
  font-weight: 400;
  line-height: 20.02px;
  letter-spacing: 0.15px;
  text-align: left;

  div {
    display: inline-block;
    position: relative;
  }

  button {
    display: inline-flex;
    align-items: center;
    margin: -3px 0 0 -3px;
    color: #000;
    background-color: #F3F3F3;
    border: none;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
    svg {
      margin-left: 8px;
      transition: transform 0.3s ease;
      transform: ${({ showDropdown }) => (showDropdown ? 'rotate(180deg)' : 'rotate(0)')};
    }
  }

  ul {
    display: ${({ showDropdown }) => (showDropdown ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 30px;
    padding: 0;
    border-radius: 0px;
    border: 1px solid #7CACCF;
    background-color: #DFEEF9;
    font-size: 15px;
    z-index: 1000;
  }

  li {
    list-style-type: none;
    padding: 0;
  }

  a {
    min-width: 30px;
    padding: 8px;
    color: #000;
    display: block;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #b3d9ff;
    }
  }

  a.active {
    background-color: #b3d9ff;
  }
`;

const PageSummary = styled.div`
  padding: .2rem 1.5rem .2rem 0;
  margin: 0 0 4px 0;
  color: #000;
  font-weight: 400;
  font-family: Lato;
  font-size: 15px;
`;

const PageSelect = styled.div`
  border: 0;
`;

const Pagination = ({
  pageInfo,
  pageClick,
  sizeClick,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const pageCount = pageInfo.total && pageInfo.pageSize
    ? Math.ceil(pageInfo.total / pageInfo.pageSize)
    : 0;

  const handlePageClick = (pageIndex) => {
    pageClick(pageIndex);
  };
  const handleSizeClick = (size) => {
    if (pageInfo.pageSize !== size) {
      sizeClick(size);
      setShowDropdown(false);
    }
  };
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <PaginationContainer>
      <>
        <ResultsPerPage showDropdown={showDropdown}>
          RESULTS PER PAGE:&nbsp;
          <div className="dropdown">
            <button type="button" onClick={toggleDropdown}>
              {pageInfo.pageSize}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658c-.566-.646-.106-1.658.753-1.658h9.592c.86 0 1.32 1.012.753 1.658l-4.796 5.482c-.566.646-1.512.646-2.078 0z" />
              </svg>
            </button>
            <ul>
              {[10, 20, 50, 100].map((size) => (
                <li key={size}>
                  <a
                    className={pageInfo.pageSize === size ? 'active' : ''}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ResultsPerPage>
        <PageSummary>
          {(pageInfo.page - 1) * pageInfo.pageSize + 1}
          -
          {pageInfo.total < pageInfo.page * pageInfo.pageSize ? pageInfo.total : pageInfo.page * pageInfo.pageSize}
          &nbsp;OF&nbsp;
          <span id="total_records_count">{pageInfo.total}</span>
        </PageSummary>
        <PageSelect>
          <BSPagination className="pagination-ccdc">
            <BSPagination.Item
              className="bspage-link-first"
              disabled={pageInfo.page === 1}
              onClick={() => handlePageClick(0)}
              title="First page"
            >
              <img src={pageInfo.page === 1 ? FirstDisabledIconImg : FirstIconImg} alt="First Page" />
            </BSPagination.Item>

            <BSPagination.Item
              className="bspage-link-prev"
              disabled={pageInfo.page === 1}
              onClick={() => handlePageClick(pageInfo.page - 1)}
              title="Previous page"
            >
              <img src={pageInfo.page === 1 ? PrevDisabledIconImg : PrevIconImg} alt="Previous Page" />
            </BSPagination.Item>

            <BSPagination.Item
              className="bspage-link-next"
              disabled={pageInfo.page === pageCount}
              onClick={() => handlePageClick(pageInfo.page + 1)}
              title="Next page"
            >
              <img src={pageInfo.page === pageCount ? NextDisabledIconImg : NextIconImg} alt="Next Page" />
            </BSPagination.Item>

            <BSPagination.Item
              className="bspage-link-last"
              disabled={pageInfo.page === pageCount}
              onClick={() => handlePageClick(pageCount)}
              title="Last page"
            >
              <img src={pageInfo.page === pageCount ? LastDisabledIconImg : LastIconImg} alt="Last Page" />
            </BSPagination.Item>
          </BSPagination>
        </PageSelect>
      </>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  pageClick: PropTypes.func.isRequired,
  sizeClick: PropTypes.func.isRequired,
};

export default Pagination;
