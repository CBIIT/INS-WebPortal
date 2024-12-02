import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import ExportButton from './ExportButton';
import Sorting from './Sorting';
import PageInfo from './PageInfo';
import Filters from './Filters';
import SearchResult from './SearchResult';
import './searchCatalogPage.css';

const useSearchParams = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const replaceQueryStr = (query, searchText) => {
  let str = '';
  if (searchText.trim() !== '') {
    str += `&search_text=${searchText.replace(/[^a-zA-Z0-9 ]/g, ' ').trim()}`;
  }
  if (query.get('filterByResource')) {
    str += `&filterByResource=${query.get('filterByResource')}`;
  }
  str += '&page=1';
  if (query.get('pageSize')) {
    str += `&pageSize=${query.get('pageSize')}`;
  }
  if (query.get('sortBy')) {
    str += `&sortBy=${query.get('sortBy')}`;
  }
  if (query.get('sortOrder')) {
    str += `&sortOrder=${query.get('sortOrder')}`;
  }
  return str.substring(1);
};

const replaceResourceFilter = (query, filter) => {
  let str = '';
  if (query.get('search_text')) {
    str += `&search_text=${query.get('search_text')}`;
  }
  if (filter !== '') {
    const tmp = query.get('filterByResource') ? query.get('filterByResource').split('|') : [];
    const idx = tmp.indexOf(filter);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter);
    }
    if (tmp.length > 0) {
      str += `&filterByResource=${tmp.join('|')}`;
    }
  }
  str += '&page=1';
  if (query.get('pageSize')) {
    str += `&pageSize=${query.get('pageSize')}`;
  }
  if (query.get('sortBy')) {
    str += `&sortBy=${query.get('sortBy')}`;
  }
  if (query.get('sortOrder')) {
    str += `&sortOrder=${query.get('sortOrder')}`;
  }
  return str.substring(1);
};

const SearchCatalogPage = ({
  searchKeyword,
  resourceFilters,
  onLoadFromUrlQuery,
  onStartFullTextSearch,
  onBubbleSearchTextRemoveClick,
  onBubbleResourcesRemoveClick,
}) => {
  const query = useSearchParams();
  const history = useHistory();
  const searchTerm = query.get('search_text') ? query.get('search_text').trim() : '';
  const [searchText, setSearchText] = useState(searchTerm);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const options = {};
    if (query.get('page')) {
      options.page = parseInt(query.get('page').trim(), 10);
    }
    if (query.get('filterByResource')) {
      options.filterByResource = query.get('filterByResource').trim().split('|');
    }
    if (query.get('pageSize')) {
      options.pageSize = parseInt(query.get('pageSize').trim(), 10);
    }
    if (query.get('sortBy')) {
      options.sortBy = query.get('sortBy').trim();
    }
    if (query.get('sortOrder')) {
      options.sortOrder = query.get('sortOrder').trim();
    }

    onLoadFromUrlQuery(searchTerm, options).catch((error) => {
      console.error(`Loading search from URL query failed: ${error}`);
    });
  }, [query.toString()]);

  const handleBubbleSearchTextRemoveClick = () => {
    setSearchText('');
    const queryStr = replaceQueryStr(query, '');
    history.push(`/datasets?${queryStr}`);
    onBubbleSearchTextRemoveClick();
  };

  const handleBubbleResourcesRemoveClick = (filter) => {
    const queryStr = replaceResourceFilter(query, filter);
    history.push(`/datasets?${queryStr}`);
    onBubbleResourcesRemoveClick();
  };

  const handleSearchBoxKeyPress = () => {
    const queryStr = replaceQueryStr(query, searchText);
    history.push(`/datasets?${queryStr}`);
    onStartFullTextSearch(searchText);
  };

  const handleSearchSubmit = () => {
    const queryStr = replaceQueryStr(query, searchText);
    history.push(`/datasets?${queryStr}`);
    onStartFullTextSearch(searchText);
  };

  const handleSearchTextInputChange = (keyword) => {
    setSearchText(keyword);
  };

  return (
    <>
      <div id="top" className="searchBarContainer">
        <div className="searchBarArea">
          <div className="searchBarLabel">
            <span>
              Explore Datasets
            </span>
          </div>
          <div className="searchBoxContainer">
            <SearchBox
              searchText={searchText}
              searchKeyword={searchKeyword}
              resourceFilters={resourceFilters}
              handleBubbleSearchTextRemoveClick={handleBubbleSearchTextRemoveClick}
              handleBubbleResourcesRemoveClick={handleBubbleResourcesRemoveClick}
              onSearchBoxKeyPress={handleSearchBoxKeyPress}
              onSearchSubmit={handleSearchSubmit}
              onSearchTextInputChange={handleSearchTextInputChange}
            />
          </div>
        </div>
      </div>
      <div className="searchCatalogContainer">
        <div className="searchArea">
          <div className="searchFiltersContainer">
            <Filters />
          </div>
          <div className="searchContentContainer">

            <div className="searchDisplayOptionsRow">

              <div className="searchSortingArea">
                <Sorting />
              </div>
              <div className="contentPagingArea">
                <PageInfo />
              </div>
              <ExportButton />
            </div>
            <div className="searchContent">
              <SearchResult />
            </div>
            <div className="searchContentFooter">
              <PageInfo />
            </div>
            <div className="space50" />
            <div className="space50" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCatalogPage;
