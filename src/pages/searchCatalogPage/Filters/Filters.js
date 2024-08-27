/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import './Filters.css';
import clearAllIcon from '../../../assets/img/clearAllIcon.svg';

const useQuery = () => new URLSearchParams(useLocation().search);

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
      tmp.sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1));
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

const Filters = ({
  searchFilters,
  sourceFilters,
  selectedFilters,
  onLoadSearchDataResources,
}) => {
  const query = useQuery();
  const history = useHistory();
  const sourceFiltersArray = Array.isArray(sourceFilters) ? sourceFilters : [sourceFilters];
  const sources = !sourceFilters || sourceFilters === 'all'
    ? searchFilters.map((element) => element.data_resource_id.toLowerCase())
    : sourceFiltersArray.filter((element) => element);

  useEffect(() => {
    if (searchFilters.length === 0) {
      onLoadSearchDataResources().catch((error) => {
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  const handleResourceClick = (filter) => {
    const queryStr = replaceResourceFilter(query, filter);
    history.push(`/datasets?${queryStr}`);
  };

  return (
    <>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Filter by Primary Disease</span>
          <button type="button" onClick={() => handleResourceClick('')} className="clear-all-button">
            <img src={clearAllIcon} alt="clear-all" />
          </button>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {searchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const checked = selectedFilters.indexOf(field.data_resource_id) > -1;
              const arrayOfSources = sources.flatMap((item) => item.split('|'));
              return arrayOfSources.includes(field.data_resource_id.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sources.indexOf(field.data_resource_id.toLowerCase()) > -1}
                  onSourceClick={handleResourceClick}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Filter by Second filter</span>
          <button type="button" onClick={() => handleResourceClick('')} className="clear-all-button">
            <img src={clearAllIcon} alt="clear-all" />
          </button>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {searchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const checked = selectedFilters.indexOf(field.data_resource_id) > -1;
              const arrayOfSources = sources.flatMap((item) => item.split('|'));
              return arrayOfSources.includes(field.data_resource_id.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sources.indexOf(field.data_resource_id.toLowerCase()) > -1}
                  onSourceClick={handleResourceClick}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  searchFilters: PropTypes.array.isRequired,
  sourceFilters: PropTypes.string.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  onLoadSearchDataResources: PropTypes.func.isRequired,
};

export default Filters;
