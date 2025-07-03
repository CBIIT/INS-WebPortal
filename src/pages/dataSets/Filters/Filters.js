/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import FilterItem from './FilterItem';
import './Filters.css';

const useQuery = () => new URLSearchParams(useLocation().search);

const replaceResourceFilter = (query, filter, filterKey) => {
  let str = '';
  if (query.get('search_text')) {
    str += `&search_text=${query.get('search_text')}`;
  }

  if (filter !== '') {
    const tmp = query.get(filterKey) ? query.get(filterKey).split('|') : [];
    const idx = tmp.indexOf(filter);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter);
    }
    if (tmp.length > 0) {
      str += `&${filterKey}=${tmp.join('|')}`;
    }
  }

  const otherFilterKey = filterKey === 'filterByResource' ? 'filterByRepo' : 'filterByResource';
  if (query.get(otherFilterKey)) {
    str += `&${otherFilterKey}=${query.get(otherFilterKey)}`;
  }

  if (query.get('pageSize')) {
    str += `&pageSize=${query.get('pageSize')}`;
  }
  if (query.get('sortBy')) {
    str += `&sortBy=${query.get('sortBy')}`;
  }
  if (query.get('sortOrder')) {
    str += `&sortOrder=${query.get('sortOrder')}`;
  }

  str += '&page=1';

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

  const [sortTypeRepo, setSortTypeRepo] = useState('alphabetically');
  const [sortTypeDisease, setSortTypeDisease] = useState('alphabetically');

  const sourceFiltersArray = Array.isArray(sourceFilters) ? sourceFilters : [sourceFilters];

  const sourcesDataRepository = !sourceFilters || sourceFilters === 'all'
    ? (searchFilters.dataset_source_repo || []).map((element) => element.name.toLowerCase())
    : sourceFiltersArray.filter((element) => element);

  const sourcesPrimaryDisease = !sourceFilters || sourceFilters === 'all'
    ? (searchFilters.primary_disease || []).map((element) => element.name.toLowerCase())
    : sourceFiltersArray.filter((element) => element);

  useEffect(() => {
    if (
      !searchFilters.dataset_source_repo
      || !searchFilters.primary_disease
      || searchFilters.dataset_source_repo.length === 0
      || searchFilters.primary_disease.length === 0
    ) {
      onLoadSearchDataResources().catch((error) => {
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  const handleResourceClickDataRepository = (filter) => {
    const queryStr = replaceResourceFilter(query, filter, 'filterByRepo');
    history.push(`/datasets?${queryStr}`);
  };

  const handleResourceClickPrimaryDisease = (filter) => {
    const queryStr = replaceResourceFilter(query, filter, 'filterByResource');
    history.push(`/datasets?${queryStr}`);
  };

  const sortedDataRepositorySearchFilters = [...(searchFilters.dataset_source_repo || [])].sort((a, b) => {
    if (sortTypeRepo === 'count') return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  const sortedPrimaryDiseaseSearchFilters = [...(searchFilters.primary_disease || [])].sort((a, b) => {
    if (sortTypeDisease === 'count') return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  const resetIcon = {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
    alt: 'Reset icon',
    size: '12 px',
  };

  const clearAllFilters = (qry) => {
    let str = '';

    if (qry.get('search_text')) {
      str += `&search_text=${qry.get('search_text')}`;
    }
    if (qry.get('pageSize')) {
      str += `&pageSize=${qry.get('pageSize')}`;
    }
    if (qry.get('sortBy')) {
      str += `&sortBy=${qry.get('sortBy')}`;
    }
    if (qry.get('sortOrder')) {
      str += `&sortOrder=${qry.get('sortOrder')}`;
    }

    str += '&page=1';

    return str.substring(1);
  };

  return (
    <>
      <div>
        <div className="floatRight">
          <Button
            id="button_sidebar_clear_all_filters"
            variant="outlined"
            onClick={() => {
              const queryStr = clearAllFilters(query);
              history.push(`/datasets?${queryStr}`);
            }}
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
          <span>Filter by Data Repository</span>
        </div>
        <div className="sort">
          <span className="icon">
            <Button
              onClick={() => handleResourceClickDataRepository('')}
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
          <span
            className={`alphabetically ${sortTypeRepo === 'alphabetically' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeRepo('alphabetically')}
          >
            Sort Alphabetically
          </span>
          <span
            className={`count ${sortTypeRepo === 'count' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeRepo('count')}
          >
            Sort By Count
          </span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {sortedDataRepositorySearchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const arrayOfSources = sourcesDataRepository.flatMap((item) => item.split('|'));
              const checked = !!(selectedFilters.dataset_source_repo
                && selectedFilters.dataset_source_repo.indexOf(field.name) > -1);
              return arrayOfSources.includes(field.name.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sourcesDataRepository.indexOf(field.name.toLowerCase()) > -1}
                  onSourceClick={handleResourceClickDataRepository}
                />
              ) : null;
            })}
          </div>
        </div>
        <hr className="divider" />
        <div className="filterLabel">
          <span>Filter by Primary Disease</span>
        </div>
        <div className="sort">
          <span className="icon">
            <Button
              onClick={() => handleResourceClickPrimaryDisease('')}
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
          <span
            className={`alphabetically ${sortTypeDisease === 'alphabetically' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeDisease('alphabetically')}
          >
            Sort Alphabetically
          </span>
          <span
            className={`count ${sortTypeDisease === 'count' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeDisease('count')}
          >
            Sort By Count
          </span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {sortedPrimaryDiseaseSearchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const arrayOfSources = sourcesPrimaryDisease.flatMap((item) => item.split('|'));
              const checked = !!(selectedFilters.primary_disease
                && selectedFilters.primary_disease.indexOf(field.name) > -1);
              return arrayOfSources.includes(field.name.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sourcesPrimaryDisease.indexOf(field.name.toLowerCase()) > -1}
                  onSourceClick={handleResourceClickPrimaryDisease}
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
