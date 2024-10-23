import React, { useEffect, useState } from 'react'; // Add useState
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
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

  // Add sorting state
  const [sortType, setSortType] = useState('alphabetically'); // Can be 'alphabetically' or 'count'

  const sourceFiltersArray = Array.isArray(sourceFilters) ? sourceFilters : [sourceFilters];
  const sources = !sourceFilters || sourceFilters === 'all'
    ? searchFilters.map((element) => element.name.toLowerCase())
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

  // Add handler to change sorting type
  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  // Sort searchFilters based on the selected sortType
  const sortedSearchFilters = [...searchFilters].sort((a, b) => {
    if (sortType === 'alphabetically') {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    } if (sortType === 'count') {
      return b.count - a.count; // Assuming there is a 'count' field in the searchFilters items
    }
    return 0;
  });

  const resetIcon = {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
    alt: 'Reset icon',
    size: '12 px',
  };

  // Dynamic CSS classes for sorting options
  const alphabeticallyClass = sortType === 'alphabetically' ? 'sortOption selected' : 'sortOption';
  const countClass = sortType === 'count' ? 'sortOption selected' : 'sortOption';

  return (
    <>
      <div>
        <div className="floatRight">
          <Button
            id="button_sidebar_clear_all_filters"
            variant="outlined"
            onClick={() => handleResourceClick('')}
            className="customButton"
            classes={{ root: 'clearAllButtonRoot' }}
          >
            <img
              src={resetIcon.src}
              height={resetIcon.size}
              width={resetIcon.size}
              alt={resetIcon.alt}
            />
          </Button>
          <span className="resetText">
            Clear all filtered selections
          </span>
        </div>
        <hr className="divider" />
        <div className="filterLabel">
          <span>Filter by  Primary Disease</span>
        </div>
        <div className="sort">
          <span className="icon">
            <Button
              onClick={() => handleResourceClick('')}
              className="reset"
              classes={{ root: 'clearAllButtonRoot' }}
            >
              <img
                src={resetIcon.src}
                height={resetIcon.size}
                width={resetIcon.size}
                alt={resetIcon.alt}
              />
            </Button>
          </span>
          <span className={alphabeticallyClass} onClick={() => handleSortTypeChange('alphabetically')}>
            Sort alphabetically
          </span>
          <span className={countClass} onClick={() => handleSortTypeChange('count')}>
            Sort by count
          </span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {sortedSearchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const arrayOfSources = sources.flatMap((item) => item.split('|'));
              const checked = !!(selectedFilters.primary_disease
                && selectedFilters.primary_disease.indexOf(field.name) > -1);
              return arrayOfSources.includes(field.name.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sources.indexOf(field.name.toLowerCase()) > -1}
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

export default Filters;
