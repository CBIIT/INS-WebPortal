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
`;

const ResultsPerPage = styled.div`
  margin: 5px 12px 0 0;
  color: #004187;
  font-weight: 400;
  font-family: Lato;
  font-size: 15px;

  div {
    display: inline-block;
    position: relative;
  }

  button {
    display: inline-block;
    display: inline-flex;
    align-items: center;
    margin: -3px 0 0 -3px;
    margin: -3px 0 0 -3px;
    color: #004187;
    color: #004187;
    background-color: #F3F3F3;
    background-color: #F3F3F3;
    border: none;
    border: none;
    font-size: 15px;
    font-size: 15px;
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
    color: #004187;
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
  margin: 3px 0 0 0;
  color: #004187;
  font-weight: 400;
  font-family: Lato;
  font-size: 15px;
`;

const PageSelect = styled.div`
  border: 0;
`;

const getPager = (totalPages, currentPage) => {
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = 5;
  } else if (currentPage + 2 >= totalPages) {
    startPage = totalPages - 4;
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  const pages = [...Array((endPage + 1) - startPage).keys()].map((i) => startPage + i);

  return pages;
};

const Pagination = ({
  pageInfo,
  pageClick,
  sizeClick,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const pageCount = pageInfo.total && pageInfo.pageSize
    ? Math.ceil(pageInfo.total / pageInfo.pageSize)
    : 0;
  const pages = getPager(pageCount, pageInfo.page);
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
            {pageInfo.page === 1 ? (
              <>
                <BSPagination className="bspage-link-first-disabled" disabled>
                  <img src={FirstDisabledIconImg} alt="first-disabled-icon" />
                </BSPagination>
                <BSPagination className="bspage-link-prev-disabled" disabled>
                  <img src={PrevDisabledIconImg} alt="prev-disabled-icon" />
                </BSPagination>
              </>
            ) : (
              <>
                <BSPagination className="bspage-link-first" onClick={() => handlePageClick(0)}>
                  <img src={FirstIconImg} alt="first-icon" />
                </BSPagination>
                <BSPagination className="bspage-link-prev" onClick={() => handlePageClick(pageInfo.page - 1)}>
                  <img src={PrevIconImg} alt="prev-icon" />
                </BSPagination>
              </>
            )}
            {pageInfo.page === pageCount ? (
              <>
                <BSPagination className="bspage-link-next-disabled" disabled>
                  <img src={NextDisabledIconImg} alt="next-disabled-icon" />
                </BSPagination>
                <BSPagination className="bspage-link-last-disabled" disabled>
                  <img src={LastDisabledIconImg} alt="last-disabled-icon" />
                </BSPagination>
              </>
            ) : (
              <>
                <BSPagination className="bspage-link-next" onClick={() => handlePageClick(pageInfo.page + 1)}>
                  <img src={NextIconImg} alt="next-icon" />
                </BSPagination>
                <BSPagination className="bspage-link-last" onClick={() => handlePageClick(pageCount)}>
                  <img src={LastIconImg} alt="last-icon" />
                </BSPagination>
              </>
            )}
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
