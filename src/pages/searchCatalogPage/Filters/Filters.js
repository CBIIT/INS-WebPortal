/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
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

  const resetIcon = {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
    alt: 'Reset icon',
    size: '12 px',
  };

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
          <span>Filter by Primary Disease</span>
        </div>
        <div className="sort">
          <span className="icon">
            <span className="reset" aria-hidden="true">
              <img
                src={resetIcon.src}
                height={resetIcon.size}
                width={resetIcon.size}
                alt={resetIcon.alt}
              />
            </span>
          </span>
          <span className="alphabetically">Sort alphabetically</span>
          <span className="count">Sort by count</span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {searchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const checked = selectedFilters.indexOf(field.name) > -1;
              const arrayOfSources = sources.flatMap((item) => item.split('|'));
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

Filters.propTypes = {
  searchFilters: PropTypes.array.isRequired,
  sourceFilters: PropTypes.string.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  onLoadSearchDataResources: PropTypes.func.isRequired,
};

export default Filters;
