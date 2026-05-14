import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function resourcesSearchReducer(state = initialState.resources, action) {
  switch (action.type) {
    case types.RESOURCES_LOAD_RESOURCES_LIST_SUCCESS: {
      return {
        ...state,
        resourcesList: action.resourcesList,
      };
    }
    case types.RESOURCES_LOAD_SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        searchResults: action.searchResults.result,
        searchSourceResults: action.searchResults.aggs,
      };
    }
    case types.RESOURCES_UPDATE_FILTER_SUCCESS: {
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          filters: action.filter,
        },
      };
    }
    case types.RESOURCES_RUN_FULL_TEXT_SEARCH:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          search_text: action.searchText,
        },
      };
    case types.RESOURCES_SWITCH_SORTING:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          sort: {
            ...state.searchCriteria.sort,
            name: action.sorting.name,
            k: action.sorting.k,
          },
        },
      };
    case types.RESOURCES_SWITCH_SORTING_ORDER:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          sort: {
            ...state.searchCriteria.sort,
            v: action.order,
          },
        },
      };
    case types.RESOURCES_SWITCH_PAGE:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          pageInfo: {
            ...state.searchCriteria.pageInfo,
            page: action.pageInfo.page,
            total: action.pageInfo.total,
          },
        },
      };
    case types.RESOURCES_SWITCH_SIZE:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          pageInfo: {
            ...state.searchCriteria.pageInfo,
            pageSize: action.pageInfo.pageSize,
          },
        },
      };
    default:
      return state;
  }
}
