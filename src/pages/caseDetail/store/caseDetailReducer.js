/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import {
  customSort,
  getFilters,
  filterData,
  getCheckBoxData,
  transformAPIDataIntoCheckBoxData,
} from 'bento-components';
import store from '../../../store';
import client from '../../../utils/graphqlClient';

import {
  tabContainers,
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  GET_FILES_NAME_QUERY,
  GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART,
  GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART,
  GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART,
  tabIndex,
  CASE_DETAIL_QUERY,
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
  // caseIDField,
} from '../../../bento/caseDetailData';
import {
  GET_IDS_BY_TYPE,
  GET_SUBJECT_IDS,
  SUBJECT_OVERVIEW_QUERY,
  GET_SEARCH_NODES_BY_FACET,
  ageAtIndex,
} from '../../../bento/localSearchData';

const caseIDField = '1P01CA210944-01';

const storeKey = 'caseDetailTab';

const initialState = {
  caseDetailTab: {
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
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    isCaseDetailTableLoading: false,
    setSideBarLoading: false,
    error: '',
    hasError: false,
    searchCriteria: null,
    allActiveFilters: {},
    currentActiveTab: tabIndex[0].title,
    filteredSubjectIds: null,
    checkboxForAll: {
      data: [],
    },
    subjectOverView: {
      data: [],
    },
    checkbox: {
      data: [],
      defaultPanel: false,
    },
    datatable: {
      dataCase: 'undefined',
      dataSample: 'undefined',
      dataFile: 'undefined',
    },
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

/**
 * Generate a default varibles for filter query.
 *
 * Need to be updated with custodian of filter
 * @return json
 */

function allFilters() {
  const emptyFilters = {
    project_id: caseIDField,
  };
  return emptyFilters;
}

function fetchCaseDetailTab() {
  return () => {
    store.dispatch({ type: 'REQUEST_CASE_DETAIL_TAB' });
    return client
      .query({
        query: CASE_DETAIL_QUERY,
        variables: {
          ...allFilters(),
          ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
        },
      })
      .then((result) => store.dispatch({ type: 'RECEIVE_CASE_DETAIL_TAB', payload: _.cloneDeep(result) }))
      .catch((error) => store.dispatch(
        { type: 'CASE_DETAIL_TAB_QUERY_ERR', error },
      ));
  };
}

export async function getAllIds(type) {
  const allids = await client
    .query({
      query: GET_IDS_BY_TYPE(type),
      variables: {
      },
    })
    .then((result) => result.data.idsLists)
    .catch((error) => store.dispatch(
      { type: 'CASE_DETAIL_TAB_QUERY_ERR', error },
    ));
  return allids;
}
export async function getAllSubjectIds(subjectIdsArray) {
  const allids = await client
    .query({
      query: GET_SUBJECT_IDS,
      variables: {
        subject_ids: subjectIdsArray,
      },
    })
    .then((result) => result.data.findSubjectIdsInList)
    .catch((error) => store.dispatch(
      { type: 'CASE_DETAIL_TAB_QUERY_ERR', error },
    ));
  return allids;
}

export const getSubjectIds = () => getState().filteredSubjectIds;

/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */

function createFilterVariables(data) {
  const currentAllActiveFilters = getState().allActiveFilters;
  // eslint-disable-next-line  no-unused-vars
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
    if (data[0].datafield === key) {
      return data[0].isChecked
        ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data[0].name]] }
        : { ...acc, [key]: currentAllActiveFilters[key].filter((item) => item !== data[0].name) };
    }
    // return { ...acc , [key]: [...currentAllActiveFilters[key],...[data[0].name]] }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});

  return filter;
}

function createFilterVariablesRange(value, sideBarItem) {
  const currentAllActiveFilters = getState().allActiveFilters;
  currentAllActiveFilters[sideBarItem.datafield] = value;
  return currentAllActiveFilters;
  // eslint-disable-next-line  no-unused-vars
}

export function clearSectionSort(groupName) {
  store.dispatch({
    type: 'CLEAR_SECTION_SORT',
    payload: {
      groupName,
    },
  });
}

/**
 * Reducer for clear all
 *
 * @return distpatcher
 */

export async function clearAllFiltersExceptBulkUpload() {
  store.dispatch({ type: 'RESET_ALL_EXCEPT_BULK_UPLOAD' });
}

const convertResultInPrevType = (result) => {
  const payload = result;
  payload.data = {
    ...result.data.projectDetail,
    nodeCountsFromLists: {
      numberOfPublications: result.data.projectDetail.num_publications,
      numberOfDatasets: result.data.projectDetail.num_datasets,
      numberOfClinicalTrials: result.data.projectDetail.num_clinical_trials,
      numberOfPatents: result.data.projectDetail.num_patents,
    },
  };

  return payload;
};

async function getCaseData(variables) {
  const result = await client.query({
    query: GET_SEARCH_NODES_BY_FACET,
    variables,
  });
  const data = convertResultInPrevType(result);
  return data;
}

const getSubjectDetails = async (variables) => {
  const result = await client.query({
    query: SUBJECT_OVERVIEW_QUERY,
    variables: {
      offset: 0,
      first: 100,
      sort_direction: 'desc',
      order_by: 'age_at_index',
      age_at_index: [ageAtIndex, null],
      ...variables,
    },
  });
  return result;
};

export function addBulkModalSearchData(value, type) {
  // const items = value.map((val) => val.title);
  store.dispatch({ type: 'ADD_BULKSEARCHDATA', payload: { value, type } });
}

/**
 * Uplpad Modal Set
 *
 * @return distpatcher
 */

export async function uploadBulkModalSearch(searchcriteria, type) {
  addBulkModalSearchData(searchcriteria, type);
  const variables = {
    ...getState().allActiveFilters,
    ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
  };

  const [
    caseResponse,
    subjectResponse,
  ] = await Promise.all([
    getCaseData(variables),
    getSubjectDetails(variables),
  ]);

  store.dispatch({
    type: 'LOCAL_SEARCH',
    payload: {
      subjectResponse,
      result: caseResponse,
      variables,
    },
  });
}

/**
 * Local search
 *
 * @return distpatcher
 */

export async function localSearch(searchcriteria, isQuery = false) {
  const variables = {
    ...getState().allActiveFilters,
    ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
  };

  const [
    caseResponse,
    subjectResponse,
  ] = await Promise.all([
    getCaseData(variables),
    getSubjectDetails(variables),
  ]);
  store.dispatch({
    type: 'LOCAL_SEARCH',
    payload: {
      subjectResponse,
      result: caseResponse,
      variables,
    },
  });
}

/**
 * Resets the key selections
 *
 * @param {object} payload
 * @return distpatcher
 */
export function resetGroupSelections(payload) {
  return () => {
    const { dataField, groupName } = payload;
    clearSectionSort(groupName);
  };
}

/**
 * Switch to get query sort dorection and sort field .
 *
 * @param {string} payload
 *  @param {json} tabContainer
 * @return {json} with three keys QUERY, sortfield, sortDirection
 */

export function addAutoComplete({ newValue, type, isFilteredData = false }) {
  const items = isFilteredData ? newValue : newValue.map((val) => val.title);
  store.dispatch({ type: 'ADD_AUTOCOMPLETE_DATA', payload: { value: items, type } });
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
  filters = null,
) {
  const { QUERY, sortfield, sortDirection } = getQueryAndDefaultSort(payload);
  const newFilters = filters;
  // deal with empty string inside the age_at_index filter
  if (filters && filters.age_at_index && filters.age_at_index.length === 2) {
    if (filters.age_at_index.includes('')) {
      newFilters.age_at_index = [];
    }
    if (typeof filters.age_at_index[0] === 'string') {
      newFilters.age_at_index[0] = Number(newFilters.age_at_index[0]);
    }
    if (typeof filters.age_at_index[1] === 'string') {
      newFilters.age_at_index[1] = Number(newFilters.age_at_index[1]);
    }
  }
  const activeFilters = newFilters === null
    ? (getState().allActiveFilters !== {}
      ? {
        ...getState().allActiveFilters,
        ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
      }
      : allFilters()) : filters;
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

function transformCasesFileIdsToFiles(data) {
  // use reduce to combine all the files' id into single array
  const transformData = data.reduce((accumulator, currentValue) => {
    const { files } = currentValue;
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files);
    }
    return accumulator;
  }, []);
  return transformData.map((item) => ({
    files: [item.file_id],
  }));
}

function transformfileIdsToFiles(data) {
  // use reduce to combine all the files' id into single array
  return data.map((item) => ({
    files: [item.file_id],
  }));
}

/**
 * Gets all file ids for active subjectIds.
 * TODO this  functtion can use filtered file IDs except for initial load
 * @param obj fileCoubt
 * @return {json}
 */
export async function fetchAllFileIDsForSelectAll(fileCount = 100000) {
  const fileIds = getState().filteredFileIds;

  const activeFilters = getState().allActiveFilters !== {}
    ? getState().allActiveFilters : allFilters();

  const SELECT_ALL_QUERY = getState().currentActiveTab === tabIndex[2].title
    ? GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART
    : getState().currentActiveTab === tabIndex[1].title
      ? GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART
      : GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART;

  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        ...activeFilters,
        first: fileCount,
        ..._.mergeWith({}, getState().bulkUpload, getState().autoCompleteSelection, customizer),
      },
    })
    .then((result) => {
      const RESULT_DATA = getState().currentActiveTab === tabIndex[3].title ? 'patentOverViewByProject' : getState().currentActiveTab === tabIndex[2].title ? 'clinicalTrialOverViewByProject' : getState().currentActiveTab === tabIndex[1].title ? 'datasetOverViewByProject' : 'publicationOverViewByProject';
      const fileIdsFromQuery = RESULT_DATA === 'publicationOverViewByProject' ? transformfileIdsToFiles(result.data[RESULT_DATA]) : RESULT_DATA === 'datasetOverViewByProject' ? transformCasesFileIdsToFiles(result.data[RESULT_DATA]) : result.data[RESULT_DATA] || [];
      return fileIdsFromQuery;
    });

  // Restaruting the result Bringing {files} to files
  const filesArray = fetchResult.reduce((accumulator, currentValue) => {
    const { files } = currentValue;
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f));
    }
    return accumulator;
  }, []);

  // Removing fileIds that are not in our current list of filtered fileIds

  const filteredFilesArray = fileIds != null
    ? filesArray.filter((x) => fileIds.includes(x))
    : filesArray;
  return filteredFilesArray;
}

/**
 * Returns file IDs of given sampleids or subjectids.
 * @param int fileCount
 * @param graphqlquery SELECT_ALL_QUERY
 * @param array subjectIds
 * @param array sampleIds
 * @param array clinicalTrialIds
 * @param array patentIds
 * @param string apiReturnField
 * @return {json}
 */

async function getFileIDs(
  fileCount = 100000,
  SELECT_ALL_QUERY,
  subjectIds = [],
  sampleIds = [],
  clinicalTrialIds = [],
  patentIds = [],
  fileNames = [],
  apiReturnField,
) {
  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        subject_ids: subjectIds,
        sample_ids: sampleIds,
        clinical_trial_ids: clinicalTrialIds,
        patent_ids: patentIds,
        file_names: fileNames,
        first: fileCount,
      },
    })
    .then((result) => result.data[apiReturnField] || []);

  return fetchResult;
}

/*
* Removing fileIds that are not in our current list of filtered fileIds
* @param array fileIds
* @return array
*/
function filterOutFileIds(fileIds) {
  // Removing fileIds that are not in our current list of filtered fileIds
  const { filteredFileIds } = getState();

  if (fileIds
    && fileIds.length > 0
    && filteredFileIds
    && filteredFileIds != null
    && filteredFileIds.length > 0) {
    return fileIds.filter((x) => filteredFileIds.includes(x));
  }
  return fileIds;
}

/*
 * Gets all file ids for active subjectIds.
 * TODO this  functtion can use filtered file IDs except for initial load
 * @param obj fileCoubt
 * @return {json}
 */
export async function fetchAllFileIDs(fileCount = 100000, selectedIds = []) {
  let filesIds = [];
  switch (getState().currentActiveTab) {
    case tabIndex[2].title:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL, [], [], selectedIds, 'fileIDsFromList');
      break;
    case tabIndex[1].title:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL, [], selectedIds, [], 'fileIDsFromList');
      break;
    default:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL, selectedIds, [], [], 'fileIDsFromList');
  }
  return filterOutFileIds(filesIds);
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
 * Helper function to create only one filter that was from payload payload
 * @param {object} payload
 * @return distpatcher
 */

function createSingleFilterVariables(payload) {
  const currentAllActiveFilters = allFilters();
  // eslint-disable-next-line  no-unused-vars
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
    if (payload[0].datafield === key) {
      return { ...acc, [key]: [...currentAllActiveFilters[key], ...[payload[0].name]] };
    }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});
  return filter;
}

/**
 * Sort checkboxes by Checked
 *
 * @param {object} checkboxData
 * @return {json}
 */

function sortByCheckboxByIsChecked(checkboxData) {
  checkboxData.sort((a, b) => b.isChecked - a.isChecked);
  return checkboxData;
}

/**
 * Sort checkboxes by Alphabet
 *
 * @param {object} checkboxData
 * @return {json}
 */

function sortByCheckboxItemsByAlphabet(checkboxData) {
  const sortCheckbox = customSort(checkboxData);
  return sortByCheckboxByIsChecked(sortCheckbox);
}

/**
 * Sort checkboxes by Count
 *
 * @param {object} checkboxData
 * @return {json}
 */

function sortByCheckboxItemsByCount(checkboxData) {
  checkboxData.sort((a, b) => b.subjects - a.subjects);
  return sortByCheckboxByIsChecked(checkboxData);
}

/**
 * Sets the given filter variable as the only filter for the dasboard
 * @param {object} data
 * @return distpatcher
 */
export async function setSingleFilter(payload) {
  // test weather there are active case detail filters if so clear all filters
  const singlefiter = createSingleFilterVariables(payload);
  store.dispatch({ type: 'SET_SINGLE_FILTER', payload: singlefiter });
}

/**
 * Reducer for setting single checkbox filter
 * @param {object} payload
 * @return distpatcher
 */

export async function singleCheckBox(payload) {
  await setSingleFilter(payload);
  const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
}

/**
 * Trigger respective API queries when checkbox is checked.
 *
 * @param {object} payload
 * @return distpatcher
 */
export function toggleCheckBox(payload, isQuery = false) {
  return () => {
    const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
  };
}

export function toggleSlider(value, sideBarItem) {
  if (!value.includes('')) {
    const payload = {};
    const currentAllFilterVariables = createFilterVariablesRange(value, sideBarItem);
  }
}

/**
 * Reducer for sidebar loading
 *
 * @return distpatcher
 */

export function setSideBarToLoading() {
  store.dispatch({ type: 'SET_SIDEBAR_LOADING' });
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

function getCheckbox(data, mapping) {
  const checkboxData = data[mapping].map((item) => {
    return { name: item.group, isChecked: false, subjects: item.subjects };
  });
  return checkboxData;
}

/**
 *  updateFilteredAPIDataIntoCheckBoxData works for first time init Checkbox,
that function transforms the data which returns from API into a another format
so it contains more information and easy for front-end to show it correctly.
 *  * @param {object} currentGroupCount
 *  * @param {object} willUpdateGroupCount
 * * @param {object} currentCheckboxSelection
 * @return {json}
 */

function customCheckBox(data, facetSearchData1, isEmpty) {
  const caseCountField = 'subjects';
  return (
    facetSearchData1.map((mapping) => ({
      groupName: mapping.label,
      checkboxItems: mapping.slider === true
        ? data[mapping.api]
        : (isEmpty ? getCheckbox(data, mapping.apiForFiltering) : transformAPIDataIntoCheckBoxData(
          data[mapping.api],
          mapping.field,
          caseCountField,
          mapping.customNumberSort,
        )),
      datafield: mapping.datafield,
      show: mapping.show,
      slider: mapping.slider,
      quantifier: mapping.slider,
      section: mapping.section,
      tooltips: mapping.tooltips,
    }))
  );
}

export function updateFilteredAPIDataIntoCheckBoxData(data, facetSearchDataFromConfig) {
  return (
    facetSearchDataFromConfig.map((mapping) => ({
      groupName: mapping.label,
      checkboxItems: mapping.slider === true
        ? data[mapping.api]
        : transformAPIDataIntoCheckBoxData(data[mapping.apiForFiltering], mapping.field),
      datafield: mapping.datafield,
      show: mapping.show,
      slider: mapping.slider,
      quantifier: mapping.quantifier,
      section: mapping.section,
      tooltips: mapping.tooltips,
    }))
  );
}

/**
 *  Check sidebar has filter selections.
 * return boolean
 */
function hasFilter() {
  const currentAllActiveFilters = getState().allActiveFilters;
  return Object.entries(currentAllActiveFilters).filter((item) => item[1].length > 0).length > 0;
}

/**
 *  Get file name by fileids
 * @return {json}
 */

export async function getFileNamesByFileIds(fileIds) {
  const data = await client
    .query({
      query: GET_FILES_NAME_QUERY,
      variables: {
        file_ids: fileIds,
      },
    })
    .then((result) => result.data.fileOverview.map((item) => item.file_name));
  return data;
}

/**
 *  Check table has selections.
 * @return {json}
 */
export async function tableHasSelections() {
  let selectedRowInfo = [];
  let filteredIds = [];

  // without the filters, the filteredIds is null
  if (!hasFilter()) {
    return selectedRowInfo.length > 0;
  }

  const filteredNames = await getFileNamesByFileIds(getState().filteredFileIds);
  switch (getState().currentActiveTab) {
    case tabIndex[3].title:
      filteredIds = getState().filteredPatentIds;
      selectedRowInfo = getState().dataPatentSelected.selectedRowInfo;
      break;

    case tabIndex[2].title:
      filteredIds = getState().filteredClinicalTrialIds;
      selectedRowInfo = getState().dataClinicalTrialSelected.selectedRowInfo;
      break;

    case tabIndex[1].title:
      filteredIds = filteredNames;
      selectedRowInfo = getState().dataFileSelected.selectedRowInfo;
      break;

    default:
      filteredIds = getState().filteredSampleIds;
      selectedRowInfo = getState().dataSampleSelected.selectedRowInfo;
  }

  return selectedRowInfo.filter(
    (value) => (filteredIds && filteredIds !== null ? filteredIds.includes(value) : false),
  ).length > 0;
}

function setDataFileSelected(result) {
  store.dispatch({ type: 'SET_FILE_SELECTION', payload: result });
}

function setDataSampleSelected(result) {
  store.dispatch({ type: 'SET_SAMPLE_SELECTION', payload: result });
}

function setDataClinicalTrialSelected(result) {
  store.dispatch({ type: 'SET_CLINICAL_TRIAL_SELECTION', payload: result });
}

function setDataPatentSelected(result) {
  store.dispatch({ type: 'SET_PATENT_SELECTION', payload: result });
}
/**
 *  Returns the functuion depend on current active tab
 * @return {func}
 */

export function getTableRowSelectionEvent() {
  const currentState = getState();
  const tableRowSelectionEvent = currentState.currentActiveTab === tabIndex[3].title
    ? setDataPatentSelected
    : currentState.currentActiveTab === tabIndex[2].title
      ? setDataClinicalTrialSelected
      : currentState.currentActiveTab === tabIndex[1].title
        ? setDataFileSelected
        : setDataSampleSelected;
  return tableRowSelectionEvent;
}

export function clearTableSelections() {
  store.dispatch({ type: 'CLEAR_TABLE_SELECTION' });
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
  LOCAL_SEARCH: (state, item) => {
    const checkboxData = [
      {
        groupName: 'Project',
        checkboxItems: [
          {
            name: caseIDField,
            isChecked: true,
            subjects: 1,
          },
        ],
        datafield: 'project_id',
        section: 'Projects',
        show: false,
      },
    ];

    const newCheckboxData = [...checkboxData];
    checkboxData.map((val, idx) => {
      if (item.variables && item.variables[val.datafield] && item.variables[val.datafield].length) {
        const checkboxItem = newCheckboxData[idx].checkboxItems;
        checkboxItem.map((data, id) => {
          const index = item.variables[val.datafield].findIndex((check) => check === data.name);
          if (index >= 0) {
            checkboxItem[id].isChecked = true;
          }
          return null;
        });
        newCheckboxData[idx].checkboxItems = checkboxItem;
      }
      return null;
    });
    return {
      ...state,
      setSideBarLoading: false,
      datatable: {
        dataCase: item.subjectResponse.data.subjectOverview,
      },
      checkbox: {
        data: newCheckboxData,
        variables: item.variables,
      },
      data: item.result.data,
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
  SET_SINGLE_FILTER: (state, item) => (
    {
      ...state,
      allActiveFilters: item,
    }
  ),
  SET_CASE_DETAIL_TABLE_LOADING: (state) => ({ ...state, isCaseDetailTableLoading: true }),
  TOGGGLE_CHECKBOX: (state, item) => {
    const dataTableFilters = getFilters(state.datatable.filters, item);
    const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
    const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
      ? getCheckBoxData(
        state.subjectOverView.data,
        state.checkboxForAll.data,
        state.checkbox.data.filter((d) => item[0].groupName === d.groupName)[0],
        dataTableFilters,
      )
      : state.checkboxForAll.data;
    return {
      ...state,
      isCalulatingCaseDetail: false,
      checkbox: {
        data: updatedCheckboxData,
      },
      datatable: {
        ...state.datatable,
        dataCase: tableData,
        filters: dataTableFilters,
      },
      filters: dataTableFilters,
      data: tableData,
    };
  },
  RECEIVE_CASE_DETAIL_TAB: (state, rawItem) => {
    const item = rawItem;

    const checkboxData = [
      {
        groupName: 'Project',
        checkboxItems: [
          {
            name: caseIDField,
            isChecked: true,
            subjects: 1,
          },
        ],
        datafield: 'project_id',
        section: 'Projects',
        show: false,
      },
    ];

    fetchDataForCaseDetailTab(tabIndex[0].title, allFilters(), null, null, null, null, null);
    return item.data
      ? {
        ...state.caseDetail,
        isFetched: true,
        isLoading: false,
        hasError: false,
        setSideBarLoading: false,
        searchCriteria: null,
        error: '',
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        filteredClinicalTrialIds: null,
        filteredPatentIds: null,
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          filters: [],
        },
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
        data: item.data.projectDetail,
      } : { ...state };
  },
  CLEAR_ALL: (state, rawItem) => {
    const item = rawItem;

    const checkboxData = [
      {
        groupName: 'Project',
        checkboxItems: [
          {
            name: caseIDField,
            isChecked: true,
            subjects: 1,
          },
        ],
        datafield: 'project_id',
        section: 'Projects',
        show: false,
      },
    ];

    fetchDataForCaseDetailTab(tabIndex[0].title, allFilters());
    return item.data
      ? {
        ...state.caseDetail,
        isFetched: true,
        isLoading: false,
        hasError: false,
        setSideBarLoading: false,
        error: '',
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        filteredClinicalTrialIds: null,
        filteredPatentIds: null,
        checkboxForAll: {
          data: checkboxData,
        },
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
        checkbox: {
          data: checkboxData,
          variables: {},
        },
        datatable: {
          filters: [],
        },
        dataSampleSelected: {
          ...state.dataSampleSelected,
        },
        dataFileSelected: {
          ...state.dataFileSelected,
        },
        dataClinicalTrialSelected: {
          ...state.dataClinicalTrialSelected,
        },
        dataPatentSelected: {
          ...state.dataPatentSelected,
        },
        sortByList: {
          ...state.sortByList,
        },
        data: item.data.projectDetail,
      } : { ...state };
  },
  SORT_SINGLE_GROUP_CHECKBOX: (state, item) => {
    const groupData = state.checkbox.data.filter((group) => item.groupName === group.groupName)[0];
    let { sortByList } = state;
    sortByList = sortByList || {};
    const sortedCheckboxItems = item.sortBy === 'count'
      ? sortByCheckboxItemsByCount(groupData.checkboxItems)
      : sortByCheckboxItemsByAlphabet(groupData.checkboxItems);

    sortByList[groupData.groupName] = item.sortBy;
    const data = state.checkbox.data.map((group) => {
      if (group.groupName === groupData.groupName) {
        const updatedGroupData = group;
        updatedGroupData.checkboxItems = sortedCheckboxItems;
        return updatedGroupData;
      }

      return group;
    });

    return { ...state, checkbox: { data }, sortByList };
  },
  SORT_ALL_GROUP_CHECKBOX_CASE_DETAIL: (state) => {
    const { sortByList = {} } = state;
    let { data } = state.checkbox;
    const rangeData = data.filter((sideBar) => sideBar.slider === true);
    data = data.filter((sideBar) => sideBar.slider !== true);
    data.map((group) => {
      const checkboxItems = sortByList[group.groupName] === 'count'
        ? sortByCheckboxItemsByCount(group.checkboxItems)
        : sortByCheckboxItemsByAlphabet(group.checkboxItems);
      const updatedGroupData = group;
      updatedGroupData.checkboxItems = checkboxItems;
      return updatedGroupData;
    });
    data = data.concat(rangeData);
    return { ...state, checkbox: { data } };
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
  SET_FILE_SELECTION: (state, item) => (
    {
      ...state,
      dataFileSelected: item,
    }
  ),
  SET_CLINICAL_TRIAL_SELECTION: (state, item) => (
    {
      ...state,
      dataClinicalTrialSelected: item,
    }
  ),
  SET_PATENT_SELECTION: (state, item) => (
    {
      ...state,
      dataPatentSelected: item,
    }
  ),
  RESET_CHECKBOXES: (state) => (
    {
      ...state,
      allActiveFilters: allFilters(),
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
