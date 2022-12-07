/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import store from '../../../store';
import client from '../../../utils/graphqlClient';

import {
  tabContainers,
  tabIndex,
  CASE_DETAIL_QUERY,
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
} from '../../../bento/caseDetailData';

const storeKey = 'caseDetailTab';

const initialState = {
  caseDetailTab: {
    isFetched: false,
    isLoading: false,
    isCaseDetailTableLoading: false,
    error: '',
    hasError: false,
    allActiveFilters: {},
    currentActiveTab: tabIndex[0].title,
    filteredSubjectIds: null,
    subjectOverView: {
      data: [],
    },
    data: {},
  },
};

// HELPERS
const getState = () => store.getState()[storeKey];

function shouldFetchDataForCaseDetailTabDataTable(state) {
  return !(state.isFetched);
}

// Custom function for mergeWith
// eslint-disable-next-line consistent-return
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export function fetchCaseDetailTab(projectID) {
  store.dispatch({ type: 'REQUEST_CASE_DETAIL_TAB' });
  const filter = { project_id: projectID };
  return client
    .query({
      query: CASE_DETAIL_QUERY,
      variables: {
        ...filter,
        ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
      },
    })
    .then((result) => store.dispatch({ type: 'RECEIVE_CASE_DETAIL_TAB', payload: _.cloneDeep(result) }))
    .catch((error) => store.dispatch(
      { type: 'CASE_DETAIL_TAB_QUERY_ERR', error },
    ));
}

const querySwitch = (payload, tabContainer) => {
  switch (payload) {
    case ('Publications'):
      return { QUERY: GET_PUBLICATIONS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Datasets'):
      return { QUERY: GET_DATASETS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Clinical Trials'):
      return { QUERY: GET_CLINICAL_TRIALS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    default:
      return { QUERY: GET_PATENTS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
  }
};

/**
 * Function to get getquery and default sort.
 *
 * @param {string} payload
 * @return {json} with three keys QUERY,GET_PATENTS_OVERVIEW_QUERY, sortfield
 */

const getQueryAndDefaultSort = (payload = tabIndex[0].title) => {
  const tabContainer = tabContainers.find((x) => x.name === payload);
  return querySwitch(payload, tabContainer);
};

/**
 * Updates the current active case detail tab.
 *
 * @param {object} data
 * @param {Array} subjectIDsAfterFilter
 * @param {Array} sampleIDsAfterFilter
 * @param {Array} fileIDsAfterFilter
 * @param {Array} clinicalTrialIDsAfterFilter
 * @param {Array} patentIDsAfterFilter
 * @return {json}
 */

export function fetchDataForCaseDetailTab(
  payload,
  projectID,
) {
  const { QUERY, sortfield, sortDirection } = getQueryAndDefaultSort(payload);
  const activeFilters = { project_id: projectID };
  return client
    .query({
      query: QUERY,
      variables: {
        ...activeFilters,
        order_by: sortfield || '',
        sort_direction: sortDirection || 'asc',
      },
    })
    .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, sortDirection, ..._.cloneDeep(result) } }))
    .catch((error) => store.dispatch(
      { type: 'CASE_DETAIL_TAB_QUERY_ERR', error },
    ));
}

/**
 * Reducer for fetch case detail data
 *
 * @return distpatcher
 */

export function fetchDataForCaseDetailTabDataTable() {
  if (shouldFetchDataForCaseDetailTabDataTable(getState())) {
    return store.dispatch(fetchCaseDetailTab());
  }
  fetchDataForCaseDetailTab(tabIndex[0].title);
  return store.dispatch({ type: 'READY_CASE_DETAIL_TAB' });
}

/**
 * Reducer for setting case detail table loading loading
 *
 * @return distpatcher
 */

export function setCaseDetailTableLoading() {
  store.dispatch({ type: 'SET_CASE_DETAIL_TABLE_LOADING' });
}

/**
 * Reducer for sorting checkboxes.
 *
 * @return distpatcher
 */

export function sortSection(groupName, sortBy) {
  store.dispatch({
    type: 'SORT_SINGLE_GROUP_CHECKBOX',
    payload: {
      groupName,
      sortBy,
    },
  });
}

export function sortAll() {
  store.dispatch({
    type: 'SORT_ALL_GROUP_CHECKBOX_CASE_DETAIL',
  });
}

export const getCaseDetail = () => getState();

export function setSearchCriteria(payload) {
  store.dispatch({
    type: 'SET_SEARCH_CRITERIA',
    payload,
  });
}

// reducers
const reducers = {
  CASE_DETAIL_TAB_QUERY_ERR: (state, item) => ({
    ...state,
    hasError: true,
    error: item,
    isLoading: false,
    isFetched: false,
  }),
  READY_CASE_DETAIL_TAB: (state) => {
    return {
      ...state,
      isLoading: false,
      isFetched: true,
      setSideBarLoading: false,
      isCaseDetailTableLoading: false,
    };
  },
  UPDATE_CURRRENT_TAB_DATA: (state, item) => (
    {
      ...state,
      isCaseDetailTableLoading: false,
      currentActiveTab: item.currentTab,
      datatable: {
        ...state.datatable,
        dataPublication: item.data.publicationOverViewByProject,
        dataDataset: item.data.datasetOverViewByProject,
        dataClinicalTrial: item.data.clinicalTrialOverViewByProject,
        dataPatent: item.data.patentOverViewByProject,
      },
    }
  ),
  SET_SEARCH_CRITERIA: (state, item) => ({
    ...state,
    searchCriteria: item,
  }),
  REQUEST_CASE_DETAIL_TAB: (state) => ({ ...state, isLoading: true }),
  SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
  SET_CASE_DETAIL_TABLE_LOADING: (state) => ({ ...state, isCaseDetailTableLoading: true }),
  RECEIVE_CASE_DETAIL_TAB: (state, rawItem) => {
    const item = rawItem;
    const filter = { project_id: item.data.projectDetail.project_id };
    return item.data
      ? {
        ...state.caseDetail,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        allActiveFilters: filter,
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        filteredClinicalTrialIds: null,
        filteredPatentIds: null,
        data: item.data,
      } : { ...state };
  },
  CLEAR_SECTION_SORT: (state, item) => {
    const { sortByList = {} } = state;
    const { groupName } = item;
    // eslint-disable-next-line
    sortByList[groupName] ? delete sortByList[groupName] : null;

    return { ...state, sortByList };
  },
  SET_SAMPLE_SELECTION: (state, item) => (
    {
      ...state,
      dataSampleSelected: item,
    }
  ),

  CLEAR_TABLE_SELECTION: (state) => ({
    ...state,
    dataSampleSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataFileSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataClinicalTrialSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataPatentSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
  }),
  RESET_ALL: (state) => ({
    ...state,
    autoCompleteSelection: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    bulkUpload: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    allActiveFilters: {},
  }),
  RESET_ALL_EXCEPT_BULK_UPLOAD: (state) => ({
    ...state,
    autoCompleteSelection: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    allActiveFilters: {},
  }),
  ADD_AUTOCOMPLETE_DATA: (state, { type, value }) => ({
    ...state,
    autoCompleteSelection: {
      ...state.autoCompleteSelection,
      [`${type}_ids`]: value,
    },
  }),
  ADD_BULKSEARCHDATA: (state, { type, value }) => ({
    ...state,
    bulkUpload: {
      [`${type}_ids`]: value,
    },
  }),
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
