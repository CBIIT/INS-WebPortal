/* eslint-disable */
import _ from 'lodash';
import {
  customCheckBox,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  setSelectedFilterValues,
  transformInitialDataForSunburst,
  transformAPIDataIntoCheckBoxData,
} from 'bento-components';
import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData, facetSearchData } from '../../../bento/dashboardData';

import store from '../../../store';
import client from '../../../utils/graphqlClient';
import {
  tabContainers,
  DASHBOARD_QUERY,
  FILTER_QUERY,
  FILTER_GROUP_QUERY,
  GET_PROJECTS_OVERVIEW_QUERY,
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  GET_PROJECTS_OVERVIEW_DESC_QUERY,
  GET_PUBLICATIONS_OVERVIEW_DESC_QUERY,
  GET_DATASETS_OVERVIEW_DESC_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_DESC_QUERY,
  GET_PATENTS_OVERVIEW_DESC_QUERY,
  GET_FILES_NAME_QUERY,
  GET_FILE_IDS_FROM_FILE_NAME,
  tabIndex,
} from '../../../bento/dashboardTabData';

const storeKey = 'dashboardTab';

const initialState = {
  dashboardTab: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    isDashboardTableLoading: false,
    setSideBarLoading: false,
    error: '',
    hasError: false,
    stats: {},
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
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
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
    widgets: {},
  },
};

// HELPERS
const getState = () => store.getState()[storeKey];

function shouldFetchDataForDashboardTabDataTable(state) {
  return !(state.isFetched);
}

/**
 * Returns the  stats from inputAPI data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
function getStatInit(input, statCountVariables) {
  const initStats = statCountVariables.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

/**
 * Returns the filtered stats from inputAPT data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
function getFilteredStat(input, statCountVariables) {
  const filteredStats = statCountVariables.reduce((acc, stat) => (
    { ...acc, [stat.statAPI]: input[stat.statAPI] }
  ), {});
  return filteredStats;
}

/**
 * removes EmptySubjectsFromDonutData.
 * @param {object} data
 *  @param {object}
 */
const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);

// --------------- Transform RCR data --------------
const transformRCRData = (data) => {
  const publicationCountByRCRTransformedData = [];

  for (let i = 0; i < data.publicationCountByRCR.length; i += 1) {
    if (data.publicationCountByRCR[i].group !== 'N/A') {
      publicationCountByRCRTransformedData.push(data.publicationCountByRCR[i]);
    }
  }

  for (let j = 0; j < publicationCountByRCRTransformedData.length; j += 1) {
    if (publicationCountByRCRTransformedData[j].group === null) {
      publicationCountByRCRTransformedData[j].group = '0';
    }
  }

  publicationCountByRCRTransformedData.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)

  return publicationCountByRCRTransformedData;
}

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsInitData(data, widgetsInfoFromCustConfig) {
  data.publicationCountByRCRTransformed = transformRCRData(data);
  data.projectCountByDOCSorted = data.projectCountByDOC.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
  data.publicationCountByYearSorted = data.publicationCountByYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
  data.projectCountByFiscalYearSorted = data.projectCountByFiscalYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
  data.projectCountByAwardAmountSorted = data.projectCountByAwardAmount.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
  data.publicationCountByCitationSorted = data.publicationCountByCitation.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)

  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName]) : removeEmptySubjectsFromDonutData(data[widget.dataName]);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function fetchDashboardTab() {
  return () => {
    store.dispatch({ type: 'REQUEST_DASHBOARDTAB' });
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => store.dispatch({ type: 'RECEIVE_DASHBOARDTAB', payload: _.cloneDeep(result) }))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  };
}

function fetchDashboardTabForClearAll() {
  return () => client
    .query({
      query: DASHBOARD_QUERY,
    })
    .then((result) => store.dispatch({ type: 'CLEAR_ALL', payload: _.cloneDeep(result) }))
    .then((result) => store.dispatch({ type: 'SORT_ALL_GROUP_CHECKBOX' }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

/**
 * Generate a default varibles for filter query.
 *
 * Need to be updated with custodian of filter
 * @return json
 */

function allFilters() {
  const emptyFilters = facetSearchData.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  return emptyFilters;
}

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

/**
 * Returns active filter list while removing the param group.
 *
 * @param {object} data
 * @return {json}
 */
function clearGroup(data) {
  let currentAllActiveFilters = getState().allActiveFilters;
  currentAllActiveFilters[data] = [];
  return currentAllActiveFilters;
}

/**
 * Resets the group selections
 *
 * @param {object} payload
 * @return distpatcher
 */
export function resetGroupSelections(payload) {
  return () => {
    const { dataField, groupName } = payload;
    const currentAllFilterVariables = clearGroup(dataField);
    clearSectionSort(groupName);

    // For performance issue we are using initial dasboardquery instead of fitered for empty filters
    if (_.isEqual(currentAllFilterVariables, allFilters())) {
      clearAllFilters();
    } else toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
  };
}

/**
 * Switch to get query sort dorection and sort field .
 *
 * @param {string} payload
 *  @param {json} tabContainer
 * @return {json} with three keys QUERY, sortfield, sortDirection
 */

const querySwitch = (payload, tabContainer) => {
  switch (payload) {
    case ('Projects'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_PROJECTS_OVERVIEW_DESC_QUERY : GET_PROJECTS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Publications'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_PUBLICATIONS_OVERVIEW_DESC_QUERY : GET_PUBLICATIONS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Datasets'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_DATASETS_OVERVIEW_DESC_QUERY : GET_DATASETS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Clinical Trials'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_CLINICAL_TRIALS_OVERVIEW_DESC_QUERY : GET_CLINICAL_TRIALS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    default:
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_PATENTS_OVERVIEW_DESC_QUERY : GET_PATENTS_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
  }
};

/**
 * Function to get getquery and default sort.
 *
 * @param {string} payload
 * @return {json} with three keys QUERY,GET_PROJECTS_OVERVIEW_DESC_QUERY, sortfield
 */

const getQueryAndDefaultSort = (payload = tabIndex[0].title) => {
  const tabContainer = tabContainers.find((x) => x.name === payload);
  return querySwitch(payload, tabContainer);
};

/**
 * Updates the current active dashboard tab.
 *
 * @param {object} data
 * @param {Array} subjectIDsAfterFilter
 * @param {Array} sampleIDsAfterFilter
 * @param {Array} fileIDsAfterFilter
 * @param {Array} clinicalTrialIDsAfterFilter
 * @param {Array} patentIDsAfterFilter
 * @return {json}
 */

export function fetchDataForDashboardTab(
  payload,
  subjectIDsAfterFilter = null,
  sampleIDsAfterFilter = null,
  fileIDsAfterFilter = null,
  clinicalTrialIDsAfterFilter = null,
  patentIDsAfterFilter = null,
) {
  const { QUERY, sortfield, sortDirection } = getQueryAndDefaultSort(payload);
  return client
    .query({
      query: QUERY,
      variables: {
        project_ids: subjectIDsAfterFilter, publication_ids: sampleIDsAfterFilter, accessions: fileIDsAfterFilter, clinical_trial_ids: clinicalTrialIDsAfterFilter, patent_ids: patentIDsAfterFilter, order_by: sortfield || '',
      },
    })
    .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, sortDirection, ..._.cloneDeep(result) } }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
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
  const subjectIds = getState().filteredSubjectIds;
  const sampleIds = getState().filteredSampleIds;
  const fileIds = getState().filteredFileIds;
  const clinicalTrialIds = getState().filteredClinicalTrialIds;
  const patentIds = getState().filteredPatentIds;
  const SELECT_ALL_QUERY = getState().currentActiveTab === tabIndex[2].title
    ? GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL
    : getState().currentActiveTab === tabIndex[1].title
      ? GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL
      : GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL;

  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        subject_ids: subjectIds,
        sample_ids: sampleIds,
        file_ids: fileIds,
        clinical_trial_ids: clinicalTrialIds,
        patent_ids: patentIds,
        first: fileCount,
      },
    })
    .then((result) => {
      const RESULT_DATA = getState().currentActiveTab === tabIndex[4].title ? 'patentOverViewPaged' : getState().currentActiveTab === tabIndex[3].title ? 'clinicalTrialOverViewPaged' : getState().currentActiveTab === tabIndex[2].title ? 'datasetOverViewPaged' : getState().currentActiveTab === tabIndex[1].title ? 'publicationOverViewPaged' : 'projectOverViewPaged';
      const fileIdsFromQuery = RESULT_DATA === 'projectOverViewPaged' ? transformfileIdsToFiles(result.data[RESULT_DATA]) : RESULT_DATA === 'datasetOverViewPaged' ? transformCasesFileIdsToFiles(result.data[RESULT_DATA]) : result.data[RESULT_DATA] || [];
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

  return filesArray;
}

/**
 * Returns file IDs of given filenames.
 * @param array file_name
 * @param int offset
 * @param int first
 * @param SORT_SINGLE_GROUP_CHECKBOX order_by
 * @return {json}
 */

async function getFileIDsByFileName(file_name = [], offset = 0, first = 100000, order_by = 'file_name') {
  const data = await client
    .query({
      query: GET_FILE_IDS_FROM_FILE_NAME,
      variables: {
        file_name,
        offset,
        first,
        order_by,
      },
    })
    .then((result) => {
      if (result && result.data && result.data.fileIdsFromFileNameDesc.length > 0) {
        return result.data.fileIdsFromFileNameDesc.map((d) => d.file_id);
      }
      return [];
    });
  return data;
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
  apiReturnField,
) {
  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        subject_ids: subjectIds,
        sample_ids: sampleIds,
        file_ids: [],
        clinical_trial_ids: clinicalTrialIds,
        patent_ids: patentIds,
        first: fileCount,
      },
    })
    .then((result) => result.data[apiReturnField] || []);

  return fetchResult.reduce((accumulator, currentValue) => {
    const { files } = currentValue;
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => {
        if (typeof f.file_id !== 'undefined') {
          return f.file_id
        }
        return f
      }));
    }
    return accumulator;
  }, []);
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
export async function fetchAllFileIDs(fileCount = 100000, selectedIds = [], offset = 0.0, first = 100000, order_by = 'file_name') {
  let filesIds = [];
  switch (getState().currentActiveTab) {
    case tabIndex[2].title:
      filesIds = await getFileIDsByFileName(selectedIds, offset, first, order_by);
      break;
    case tabIndex[1].title:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL, [], selectedIds, 'publicationOverView');
      break;
    default:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL, selectedIds, [], 'projectOverViewPaged');
  }
  return filterOutFileIds(filesIds);
}

export const getFilesCount = () => getState().stats.numberOfFiles;

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsData(input, widgetsInfoFromCustConfig) {
  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field) : getDonutDataFromDashboardData(input, widget.datatable_field);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

/**
 * Reducer for fetch dashboard data
 *
 * @return distpatcher
 */

export function fetchDataForDashboardTabDataTable() {
  if (shouldFetchDataForDashboardTabDataTable(getState())) {
    return store.dispatch(fetchDashboardTab());
  }
  return store.dispatch({ type: 'READY_DASHBOARDTAB' });
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
 * Helper function to query and get filtered values for dashboard
 * @param {object} payload ingeneral its a single filter variable used to set the checkbox
 * @param {obj} currentAllFilterVariables gets the current active filters
 * @return distpatcher
 */
function toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables) {
  return client
    .query({ // request to get the filtered subjects
      query: FILTER_QUERY,
      variables: { ...currentAllFilterVariables, first: 100 },
    })
    .then((result) => client.query({ // request to get the filtered group counts
      query: FILTER_GROUP_QUERY,
      variables: { subject_ids: result.data.searchProjects.projectIds },
    })
      .then((result2) => store.dispatch({
        type: 'TOGGLE_CHECKBOX_WITH_API',
        payload: {
          filter: payload,
          allFilters: currentAllFilterVariables,
          groups: _.cloneDeep(result2),
          ..._.cloneDeep(result),
        },
      }))
      .then(() => store.dispatch({
        type: 'SORT_ALL_GROUP_CHECKBOX',
      }))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      )))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
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
  checkboxData.sort(((a, b) => (a.name > b.name || -(a.name < b.name))));
  return sortByCheckboxByIsChecked(checkboxData);
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
 * Reducer for clear all
 *
 * @return distpatcher
 */

export function clearAllFilters() {
  store.dispatch(fetchDashboardTabForClearAll());
}

/**
 * Sets the given filter variable as the only filter for the dasboard
 * @param {object} data
 * @return distpatcher
 */
export async function setSingleFilter(payload) {
  // test weather there are active dashboard filters if so clear all filters
  if (!_.isEqual(getState().allActiveFilters, allFilters())) {
    await clearAllFilters();
  }
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
  toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
}

/**
 * Trigger respective API queries when checkbox is checked.
 *
 * @param {object} payload
 * @return distpatcher
 */
export function toggleCheckBox(payload) {
  return () => {
    const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
    // For performance issue we are using initial dasboardquery instead of fitered for empty filters
    if (_.isEqual(currentAllFilterVariables, allFilters())) {
      clearAllFilters();
    } else toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
  };
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
 * Reducer for setting dashboardtable loading loading
 *
 * @return distpatcher
 */

export function setDashboardTableLoading() {
  store.dispatch({ type: 'SET_DASHBOARDTABLE_LOADING' });
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

export function clearSectionSort(groupName) {
  store.dispatch({
    type: 'CLEAR_SECTION_SORT',
    payload: {
      groupName,
    }
  });
}

export function sortAll() {
  store.dispatch({
    type: 'SORT_ALL_GROUP_CHECKBOX',
  });
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
export function updateFilteredAPIDataIntoCheckBoxData(data, facetSearchDataFromConfig) {
  return (
    facetSearchDataFromConfig.map((mapping) => ({
      groupName: mapping.label,
      checkboxItems: transformAPIDataIntoCheckBoxData(data[mapping.apiForFiltering], mapping.field),
      datafield: mapping.datafield,
      show: mapping.show,
      section: mapping.section,
    }))
  );
}

export function getCountForAddAllFilesModal() {
  const currentState = getState();
  const numberCount = currentState.currentActiveTab === tabIndex[0].title
    ? currentState.stats.numberOfCases
    : currentState.currentActiveTab === tabIndex[1].title
      ? currentState.stats.numberOfSamples : currentState.stats.numberOfFiles;
  return { activeTab: currentState.currentActiveTab || tabIndex[2].title, count: numberCount };
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
    case tabIndex[4].title:
      filteredIds = filteredPatentIds;
      selectedRowInfo = getState().dataPatentSelected.selectedRowInfo;
      break;

    case tabIndex[3].title:
      filteredIds = filteredClinicalTrialIds;
      selectedRowInfo = getState().dataClinicalTrialSelected.selectedRowInfo;
      break;

    case tabIndex[2].title:
      filteredIds = filteredNames;
      selectedRowInfo = getState().dataFileSelected.selectedRowInfo;
      break;

    case tabIndex[1].title:
      filteredIds = getState().filteredSampleIds;
      selectedRowInfo = getState().dataSampleSelected.selectedRowInfo;
      break;

    default:
      filteredIds = getState().filteredSubjectIds;
      selectedRowInfo = getState().dataCaseSelected.selectedRowInfo;
  }

  return selectedRowInfo.filter(
    (value) => (filteredIds && filteredIds !== null ? filteredIds.includes(value) : false),
  ).length > 0;
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
 *  Returns the functuion depend on current active tab
 * @return {func}
 */

export function getTableRowSelectionEvent() {
  const currentState = getState();
  const tableRowSelectionEvent =
    currentState.currentActiveTab === tabIndex[4].title
      ? setDataPatentSelected
      : currentState.currentActiveTab === tabIndex[3].title
        ? setDataClinicalTrialSelected
        : currentState.currentActiveTab === tabIndex[2].title
          ? setDataFileSelected
          : currentState.currentActiveTab === tabIndex[1].title
            ? setDataSampleSelected
            : setDataCaseSelected;
  return tableRowSelectionEvent;
}

function setDataCaseSelected(result) {
  store.dispatch({ type: 'SET_CASES_SELECTION', payload: result });
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


export function clearTableSelections() {
  store.dispatch({ type: 'CLEAR_TABLE_SELECTION' });
}

export const getDashboard = () => getState();

// reducers
const reducers = {
  DASHBOARDTAB_QUERY_ERR: (state, item) => ({
    ...state,
    hasError: true,
    error: item,
    isLoading: false,
    isFetched: false,
  }),
  READY_DASHBOARDTAB: (state) => ({
    ...state,
    isLoading: false,
    isFetched: true,
    setSideBarLoading: false,
    isDashboardTableLoading: false,
  }),
  TOGGLE_CHECKBOX_WITH_API: (state, item) => {
    const statsData1 = item.data.searchProjects
    const statsData2 = item.groups.data
    const statsDataAll = { ...statsData1, ...statsData2 }
    const updatedCheckboxData1 = updateFilteredAPIDataIntoCheckBoxData(
      item.data, facetSearchData,
    );
    const checkboxData1 = setSelectedFilterValues(updatedCheckboxData1, item.allFilters);
    fetchDataForDashboardTab(
      state.currentActiveTab,
      item.data.searchProjects.projectIds,
      item.data.searchProjects.publicationIds,
      item.data.searchProjects.accessions,
      item.data.searchProjects.clinical_trial_ids,
      item.data.searchProjects.patent_ids
    );
    return {
      ...state,
      setSideBarLoading: false,
      allActiveFilters: item.allFilters,
      filteredSubjectIds: item.data.searchProjects.projectIds,
      filteredSampleIds: item.data.searchProjects.publicationIds,
      filteredFileIds: item.data.searchProjects.accessions,
      filteredClinicalTrialIds: item.data.searchProjects.clinical_trial_ids,
      filteredPatentIds: item.data.searchProjects.patent_ids,
      checkbox: {
        data: checkboxData1,
      },
      stats: getFilteredStat(statsDataAll, statsCount),
      widgets: getWidgetsInitData(item.groups.data, widgetsData),
    };
  },
  UPDATE_CURRRENT_TAB_DATA: (state, item) => (
    {
      ...state,
      isDashboardTableLoading: false,
      currentActiveTab: item.currentTab,
      datatable: {
        ...state.datatable,
        dataProject: item.sortDirection === 'desc' ? item.data.projectOverViewPagedDesc : item.data.projectOverViewPaged,
        dataPublication: item.sortDirection === 'desc' ? item.data.publicationOverViewPagedDesc : item.data.publicationOverViewPaged,
        dataDataset: item.sortDirection === 'desc' ? item.data.datasetOverViewPagedDesc : item.data.datasetOverViewPaged,
        dataClinicalTrial: item.sortDirection === 'desc' ? item.data.clinicalTrialOverViewPagedDesc : item.data.clinicalTrialOverViewPaged,
        dataPatent: item.sortDirection === 'desc' ? item.data.patentOverViewPagedDesc : item.data.patentOverViewPaged,
      },
    }
  ),
  REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
  SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
  SET_SINGLE_FILTER: (state, item) => (
    {
      ...state,
      allActiveFilters: item,
    }
  ),
  SET_DASHBOARDTABLE_LOADING: (state) => ({ ...state, isDashboardTableLoading: true }),
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
      isCalulatingDashboard: false,
      stats: getStatDataFromDashboardData(tableData, statsCount),
      checkbox: {
        data: updatedCheckboxData,
      },
      datatable: {
        ...state.datatable,
        dataCase: tableData,
        filters: dataTableFilters,
      },
      filters: dataTableFilters,
      widgets: getWidgetsData(tableData, widgetsData),
    };
  },
  RECEIVE_DASHBOARDTAB: (state, item) => {
    item.data.publicationCountByRCRTransformed = transformRCRData(item.data);
    item.data.projectCountByDOCSorted = item.data.projectCountByDOC.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.publicationCountByYearSorted = item.data.publicationCountByYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.projectCountByFiscalYearSorted = item.data.projectCountByFiscalYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.projectCountByAwardAmountSorted = item.data.projectCountByAwardAmount.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.publicationCountByCitationSorted = item.data.publicationCountByCitation.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)

    const checkboxData = customCheckBox(item.data, facetSearchData);
    fetchDataForDashboardTab(tabIndex[0].title, null, null, null);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        setSideBarLoading: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
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
        widgets: getWidgetsInitData(item.data, widgetsData),
        dataCaseSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
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
      } : { ...state };
  },
  CLEAR_ALL: (state, item) => {
    item.data.publicationCountByRCRTransformed = transformRCRData(item.data);
    item.data.projectCountByDOCSorted = item.data.projectCountByDOC.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.publicationCountByYearSorted = item.data.publicationCountByYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.projectCountByFiscalYearSorted = item.data.projectCountByFiscalYear.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.projectCountByAwardAmountSorted = item.data.projectCountByAwardAmount.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)
    item.data.publicationCountByCitationSorted = item.data.publicationCountByCitation.sort((a, b) => (a.subjects < b.subjects) ? 1 : -1)

    const checkboxData = customCheckBox(item.data, facetSearchData);
    fetchDataForDashboardTab(state.currentActiveTab, null, null, null);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        filteredClinicalTrialIds: null,
        filteredPatentIds: null,
        subjectOverView: {
          data: item.data.projectOverViewPaged,
        },
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          dataProject: item.data.projectOverViewPaged,
          dataPublication: item.data.publicationOverViewPaged,
          dataDataset: item.data.datasetOverViewPaged,
          dataClinicalTrial: item.data.clinicalTrialOverViewPaged,
          dataPatent: item.data.patentOverViewPaged,
          filters: [],
        },
        dataCaseSelected: {
          ...state.dataCaseSelected,
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
        widgets: getWidgetsInitData(item.data, widgetsData),

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
  SORT_ALL_GROUP_CHECKBOX: (state) => {
    const { sortByList = {} } = state;
    const { data } = state.checkbox;

    data.map((group) => {
      const checkboxItems = sortByList[group.groupName] === 'count'
        ? sortByCheckboxItemsByCount(group.checkboxItems)
        : sortByCheckboxItemsByAlphabet(group.checkboxItems);
      const updatedGroupData = group;
      updatedGroupData.checkboxItems = checkboxItems;
      return updatedGroupData;
    });

    return { ...state, checkbox: { data } };
  },
  CLEAR_SECTION_SORT: (state, item) => {
    let { sortByList = {} } = state;
    const { groupName } = item;
    sortByList[groupName] ? delete sortByList[groupName] : null;

    return { ...state, sortByList };
  },
  SET_CASES_SELECTION: (state, item) => (
    {
      ...state,
      dataCaseSelected: item,
    }
  ),
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
  CLEAR_TABLE_SELECTION: (state) => ({
    ...state,
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
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
  }),
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
