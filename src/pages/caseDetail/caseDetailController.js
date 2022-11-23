import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  dataRoot, caseIDField,
} from '../../bento/caseDetailData';
import {
  fetchCaseDetailTab,
} from './store/caseDetailReducer';

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
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <CaseDetailView data={data[dataRoot]} />;
};

export default CaseDetailContainer;
