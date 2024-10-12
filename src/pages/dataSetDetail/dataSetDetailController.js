import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataSetDetailView from './dataSetDetailView';
import Error from '../error/Error';
import { getDataSetDetailDataQuery } from '../../bento/datasetDetailData';

const DataSetDetailContainer = ({ match }) => {
  const {
    loading,
    error,
    data,
  } = useQuery(getDataSetDetailDataQuery, {
    variables: { dbGaP_phs: match.params.id },
  });

  if (loading) return <CircularProgress />;

  if (error || !data || error || !data || !data.datasetDetails) {
    return (
      <Error />
    );
  }
  return <DataSetDetailView data={data.datasetDetails} />;
};

export default DataSetDetailContainer;
