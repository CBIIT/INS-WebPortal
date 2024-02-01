import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import Error from '../error/Error';
import {
  dataRoot, caseIDField,
} from '../../bento/caseDetailData';
import {
  fetchCaseDetailTab,
} from './caseDetailReducer';

const CaseDetailContainer = ({ match }) => {
  const loading = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.isLoading
    ? state.caseDetailTab.isLoading
    : false));

  const error = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.error
    ? state.caseDetailTab.error
    : ''));

  const data = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.data
    ? state.caseDetailTab.data
    : undefined));

  useEffect(() => {
    fetchCaseDetailTab(match.params.id);
  }, []);

  if (loading) return <CircularProgress />;
  if (error || !data || data[dataRoot][caseIDField] !== match.params.id) {
    return (
      <Error />
    );
  }

  return <CaseDetailView data={data[dataRoot]} />;
};

export default CaseDetailContainer;
