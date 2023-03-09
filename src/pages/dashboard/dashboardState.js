import {
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  filterData,
  getFilters,
  getCheckBoxData,
  customCheckBox,
  transformInitialDataForSunburst,
} from '../../bento-components';
import client from '../../utils/graphqlClient';
import {
  GET_DASHBOARD_DATA_QUERY, widgetsData, facetSearchData,
} from '../../bento/dashboardData';
import { globalStatsData as statsCount } from '../../bento/globalStatsData';

export const initialState = {
  dashboard: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    error: '',
    hasError: false,
    stats: {},
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
      filters: [],
      data: [],
    },
    widgets: {},
  },
};

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const GET_DASHBOARD_DATA_QUERY_ERR = 'GET_DASHBOARD_DATA_QUERY_ERR';
export const READY_DASHBOARD = 'READY_DASHBOARD';
export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';
export const SINGLE_CHECKBOX = 'SINGLE_CHECKBOX';
export const FETCH_ALL_DATA_FOR_DASHBOARDTABLE = 'FETCH_ALL_DATA_FOR_DASHBOARDTABLE';

// Actions

export const toggleCheckBoxAction = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload,
});

export const singleCheckBoxAction = (payload) => ({
  type: SINGLE_CHECKBOX,
  payload,
});

function postRequestFetchDataDashboard() {
  return {
    type: REQUEST_DASHBOARD,
  };
}

function errorhandler(error, type) {
  return {
    type,
    error,
  };
}

function readyDashboard() {
  return {
    type: READY_DASHBOARD,
  };
}

function fetchAllDataForDashboardTable(json) {
  return {
    type: FETCH_ALL_DATA_FOR_DASHBOARDTABLE,
    payload:
    {
      data: json.data,
    },
  };
}

function getWidgetsData(input) {
  const donut = widgetsData.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field) : getDonutDataFromDashboardData(input, widget.datatable_field);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function getWidgetsInitData(data) {
  const donut = widgetsData.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName]) : data[widget.dataName];
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function getStatInit(input) {
  const initStats = statsCount.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

export function getFilteredStat(input) {
  return getStatDataFromDashboardData(input, statsCount);
}

// This need to go to dashboard controller

function shouldFetchAllDataForDashboardData(state) {
  // Incase state null when coming from arm detail and program detail
  return state === undefined ? true : !(state.dashboard.isDataTableUptoDate);
}

export function fetchAllDataForDashboardDataTable() {
  return (dispatch, getState) => Promise.resolve();
}

export function AsyncFetchAllDataForDashboardDataTable() {
  return async (dispatch, getState) => Promise.resolve();
}

function shouldFetchDataForDashboardData(state) {
  // Incase state null when coming from arm detail and program detail
  return state === undefined ? true : !(state.dashboard.isFetched);
}

export function toggleCheckBox(payload) {
  return async (dispatch, getState) => {
    if (shouldFetchAllDataForDashboardData(getState())) {
      await dispatch(AsyncFetchAllDataForDashboardDataTable());
    }
    dispatch(toggleCheckBoxAction(payload));
  };
}

export function singleCheckBox(payload) {
  return async (dispatch, getState) => {
    if (shouldFetchAllDataForDashboardData(getState())) {
      await dispatch(AsyncFetchAllDataForDashboardDataTable());
    }
    dispatch(singleCheckBoxAction(payload));
  };
}

export function fetchDataForDashboardDataTable() {
  return (dispatch, getState) => dispatch(readyDashboard());
}

// End of actions

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_CHECKBOX: {
      const dataTableFilters = action.payload;
      const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxData(
          state.subjectOverView.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        isLoading: false,
        stats: getStatDataFromDashboardData(tableData, statsCount),
        checkbox: {
          data: updatedCheckboxData,
          defaultPanel: action.payload[0].groupName,
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: getWidgetsData(tableData),
      };
    }
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxData(
          state.subjectOverView.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
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
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: getWidgetsData(tableData),
      };
    }
    case GET_DASHBOARD_DATA_QUERY_ERR:
      // get action data
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case FETCH_ALL_DATA_FOR_DASHBOARDTABLE:
      return {
        ...state,
        isDataTableUptoDate: true,
        subjectOverView: {
          data: action.payload.data.projectOverView,
        },
        datatable: {
          data: action.payload.data.projectOverView,
          filters: [],
        },
      };
    case READY_DASHBOARD:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case REQUEST_DASHBOARD:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
