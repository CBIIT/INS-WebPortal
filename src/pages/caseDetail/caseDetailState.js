export const initialState = {
  caseDetail: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    error: '',
    hasError: false,
    subjectOverView: {
      data: [],
    },
    datatable: {
      filters: [],
      data: [],
    },
    data: {},
  },
};

export const GET_CASE_DETAIL_DATA_QUERY_ERR = 'GET_CASE_DETAIL_DATA_QUERY_ERR';
export const READY_CASE_DETAIL = 'READY_CASE_DETAIL';
export const REQUEST_CASE_DETAIL = 'REQUEST_CASE_DETAIL';
export const FETCH_ALL_DATA_FOR_CASE_DETAIL_TABLE = 'FETCH_ALL_DATA_FOR_CASE_DETAIL_TABLE';

function readyCaseDetail() {
  return {
    type: READY_CASE_DETAIL,
  };
}

export function fetchAllDataForCaseDetailDataTable() {
  return (dispatch, getState) => Promise.resolve();
}

export function AsyncFetchAllDataForCaseDetailDataTable() {
  return async (dispatch, getState) => Promise.resolve();
}

export function fetchDataForCaseDetailDataTable() {
  return (dispatch, getState) => dispatch(readyCaseDetail());
}

export default function caseDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CASE_DETAIL_DATA_QUERY_ERR:
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case FETCH_ALL_DATA_FOR_CASE_DETAIL_TABLE:
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
    case READY_CASE_DETAIL:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case REQUEST_CASE_DETAIL:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
