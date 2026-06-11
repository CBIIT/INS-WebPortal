import * as types from './actionTypes';
import * as searchApi from '../../api/searchApi';

export function loadSearchFiltersSuccess(resourcesList) {
  return { type: types.RESOURCES_LOAD_RESOURCES_LIST_SUCCESS, resourcesList };
}

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.RESOURCES_LOAD_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function runFullTextSearch(searchText) {
  return { type: types.RESOURCES_RUN_FULL_TEXT_SEARCH, searchText };
}

export function applyResourcesFilter(filter) {
  return { type: types.RESOURCES_UPDATE_FILTER_SUCCESS, filter };
}

export function handleBubbleSearchTextRemove() {
  return { type: types.RESOURCES_RUN_FULL_TEXT_SEARCH, searchText: '' };
}

export function handleBubbleResourcesRemove() {
  return { type: types.RESOURCES_UPDATE_FILTER_SUCCESS, filter: [] };
}

export function switchSorting(sorting) {
  return { type: types.RESOURCES_SWITCH_SORTING, sorting };
}

export function switchSortingOrder(order) {
  return { type: types.RESOURCES_SWITCH_SORTING_ORDER, order };
}

export function switchPage(pageInfo) {
  return { type: types.RESOURCES_SWITCH_PAGE, pageInfo };
}

export function switchSize(pageInfo) {
  return { type: types.RESOURCES_SWITCH_SIZE, pageInfo };
}

export function loadSearchDataResources() {
  const func = function func(dispatch) {
    return searchApi.getResourcesSearchFilters({ filters: {} })
      .then((response) => {
        const resourcesList = {
          resource_research_area: response.data.resource_research_area || [],
          resource_tool_type: response.data.resource_tool_type || [],
        };
        dispatch(loadSearchFiltersSuccess(resourcesList));
      })
      .catch((error) => {
        throw error;
      });
  };
  return func;
}

export function loadFromUrlQuery(searchText, filters) {
  const func = function func(dispatch) {
    const searchCriteria = {};
    searchCriteria.search_text = searchText;
    searchCriteria.filters = {};

    if (Array.isArray(filters.filterByResearchArea) && filters.filterByResearchArea.length > 0) {
      searchCriteria.filters.resource_research_area = filters.filterByResearchArea;
    }

    if (Array.isArray(filters.filterByToolType) && filters.filterByToolType.length > 0) {
      searchCriteria.filters.resource_tool_type = filters.filterByToolType;
    }

    searchCriteria.pageInfo = {};
    searchCriteria.pageInfo.page = filters.page ? filters.page : 1;
    searchCriteria.pageInfo.pageSize = filters.pageSize ? filters.pageSize : 10;

    searchCriteria.sort = {};
    searchCriteria.sort.name = 'Resource';
    searchCriteria.sort.k = 'resource_title_sort';
    searchCriteria.sort.v = filters.sortOrder || 'asc';

    const filtersBody = {
      search_text: searchCriteria.search_text,
      filters: searchCriteria.filters,
    };
    return Promise.all([
      searchApi.searchResources(searchCriteria),
      searchApi.getResourcesSearchFilters(filtersBody),
    ])
      .then(([searchResults, filtersResults]) => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
        dispatch(runFullTextSearch(searchText));
        dispatch(applyResourcesFilter(searchCriteria.filters));
        dispatch(switchPage(searchResults.data.pageInfo));
        dispatch(switchSize(searchResults.data.pageInfo));
        dispatch(switchSorting({
          name: searchResults.data.sort.name,
          k: searchResults.data.sort.k,
        }));
        dispatch(switchSortingOrder(searchResults.data.sort.v));
        if (filtersResults && filtersResults.data) {
          dispatch(loadSearchFiltersSuccess(filtersResults.data));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  return func;
}

export function startFullTextSearch(searchText) {
  const func = function func(dispatch) {
    dispatch(runFullTextSearch(searchText));
  };
  return func;
}

export function bubbleSearchTextRemoveClick() {
  const func = function func(dispatch) {
    dispatch(handleBubbleSearchTextRemove());
  };
  return func;
}

export function bubbleResourcesRemoveClick() {
  const func = function func(dispatch) {
    dispatch(handleBubbleResourcesRemove());
  };
  return func;
}

export function changeSorting(sorting) {
  const func = function func(dispatch) {
    dispatch(switchSorting(sorting));
  };
  return func;
}

export function changeSortingOrder(order) {
  const func = function func(dispatch) {
    dispatch(switchSortingOrder(order));
  };
  return func;
}

export function pageSelect(pageInfo) {
  const func = function func(dispatch) {
    dispatch(switchPage(pageInfo));
  };
  return func;
}

export function sizeSelect(pageInfo) {
  const func = function func(dispatch) {
    dispatch(switchSize({ pageSize: pageInfo.pageSize ? pageInfo.pageSize : 10 }));
  };
  return func;
}
