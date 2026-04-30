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

  const otherFilterKey = filterKey === 'filterByResearchArea' ? 'filterByToolType' : 'filterByResearchArea';
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

  const [sortTypeToolType, setSortTypeToolType] = useState('alphabetically');
  const [sortTypeResearchArea, setSortTypeResearchArea] = useState('alphabetically');

  const sourceFiltersArray = Array.isArray(sourceFilters) ? sourceFilters : [sourceFilters];

  const sourcesToolType = !sourceFilters || sourceFilters === 'all'
    ? (searchFilters.resource_tool_type || []).map((element) => element.name.toLowerCase())
    : sourceFiltersArray.filter((element) => element);

  const sourcesResearchArea = !sourceFilters || sourceFilters === 'all'
    ? (searchFilters.resource_research_area || []).map((element) => element.name.toLowerCase())
    : sourceFiltersArray.filter((element) => element);

  useEffect(() => {
    if (
      !searchFilters.resource_tool_type
      || !searchFilters.resource_research_area
      || searchFilters.resource_tool_type.length === 0
      || searchFilters.resource_research_area.length === 0
    ) {
      onLoadSearchDataResources().catch((error) => {
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  const handleResourceClickToolType = (filter) => {
    const queryStr = replaceResourceFilter(query, filter, 'filterByToolType');
    history.push(`/resources?${queryStr}`);
  };

  const handleResourceClickResearchArea = (filter) => {
    const queryStr = replaceResourceFilter(query, filter, 'filterByResearchArea');
    history.push(`/resources?${queryStr}`);
  };

  const sortedToolTypeSearchFilters = [...(searchFilters.resource_tool_type || [])].sort((a, b) => {
    if (sortTypeToolType === 'count') return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  const sortedResearchAreaSearchFilters = [...(searchFilters.resource_research_area || [])].sort((a, b) => {
    if (sortTypeResearchArea === 'count') return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  const resetIcon = {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
    alt: 'Reset icon',
    size: '12px',
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
              history.push(`/resources?${queryStr}`);
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
          <span>Filter by Tool Type</span>
        </div>
        <div className="sort">
          <span className="icon">
            <Button
              onClick={() => handleResourceClickToolType('')}
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
            className={`alphabetically ${sortTypeToolType === 'alphabetically' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeToolType('alphabetically')}
          >
            Sort Alphabetically
          </span>
          <span
            className={`count ${sortTypeToolType === 'count' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeToolType('count')}
          >
            Sort By Count
          </span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {sortedToolTypeSearchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const arrayOfSources = sourcesToolType.flatMap((item) => item.split('|'));
              const checked = !!(selectedFilters.resource_tool_type
                && selectedFilters.resource_tool_type.indexOf(field.name) > -1);
              return arrayOfSources.includes(field.name.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sourcesToolType.indexOf(field.name.toLowerCase()) > -1}
                  onSourceClick={handleResourceClickToolType}
                />
              ) : null;
            })}
          </div>
        </div>
        <hr className="divider" />
        <div className="filterLabel">
          <span>Filter by Research Area</span>
        </div>
        <div className="sort">
          <span className="icon">
            <Button
              onClick={() => handleResourceClickResearchArea('')}
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
            className={`alphabetically ${sortTypeResearchArea === 'alphabetically' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeResearchArea('alphabetically')}
          >
            Sort Alphabetically
          </span>
          <span
            className={`count ${sortTypeResearchArea === 'count' ? 'sortOption selected' : ''}`}
            onClick={() => setSortTypeResearchArea('count')}
          >
            Sort By Count
          </span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {sortedResearchAreaSearchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const arrayOfSources = sourcesResearchArea.flatMap((item) => item.split('|'));
              const checked = !!(selectedFilters.resource_research_area
                && selectedFilters.resource_research_area.indexOf(field.name) > -1);
              return arrayOfSources.includes(field.name.toLowerCase()) ? (
                <FilterItem
                  key={key}
                  item={field}
                  checked={checked}
                  highlight={sourcesResearchArea.indexOf(field.name.toLowerCase()) > -1}
                  onSourceClick={handleResourceClickResearchArea}
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
