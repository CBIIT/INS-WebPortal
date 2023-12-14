/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import store from '../../store';
import client from '../../utils/graphqlClient';

import {
  tabContainers,
  tabIndex,
  CASE_DETAIL_QUERY,
  GET_PROJECTS_OVERVIEW_QUERY,
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
} from '../../bento/caseDetailData';

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
    case ('Grants'):
      return { QUERY: GET_PROJECTS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
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
  let activeFilters = { queried_project_ids: projectID };

  if (payload === 'Grants') {
    activeFilters = { queried_project_id: projectID };
  }

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

export const getCaseDetail = () => getState();

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
        dataProjects: item.data.projectOverViewByProject,
        dataPublication: item.data.publicationOverViewByProject,
        dataDataset: item.data.datasetOverViewByProject,
        dataClinicalTrial: item.data.clinicalTrialOverViewByProject,
        dataPatent: item.data.patentOverViewByProject,
      },
    }
  ),
  REQUEST_CASE_DETAIL_TAB: (state) => ({ ...state, isLoading: true }),
  SET_CASE_DETAIL_TABLE_LOADING: (state) => ({ ...state, isCaseDetailTableLoading: true }),
  RECEIVE_CASE_DETAIL_TAB: (state, rawItem) => {
    const item = rawItem;
    const filter = { project_id: item.data.projectDetail.queried_project_id, queried_project_id: item.data.projectDetail.queried_project_id, queried_project_ids: item.data.projectDetail.queried_project_id };
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
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
