import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataSetDetailView from './dataSetDetailView';
import Error from '../error/Error';
import { getDataSetDetailDataQuery, getDatasetFilesQuery } from '../../bento/datasetDetailData';

const DataSetDetailContainer = ({ match }) => {
  const {
    loading: detailsLoading,
    error: detailsError,
    data: detailsData,
  } = useQuery(getDataSetDetailDataQuery, {
    variables: { dataset_uuid: match.params.id },
  });

  const {
    loading: filesLoading,
    error: filesError,
    data: filesData,
  } = useQuery(getDatasetFilesQuery, {
    variables: {
      dataset_uuid: match.params.id,
      accessTypes: ['Open'],
    },
  });

  if (detailsLoading || filesLoading) return <CircularProgress />;

  if (detailsError || !detailsData || !detailsData.datasetDetails) {
    return (
      <Error />
    );
  }

  let datasetFiles = [];
  if (filesError) {
    console.error('Failed to load dataset files:', filesError);
    // Continue with empty files array - files are optional
  } else if (filesData && filesData.getDatasetFiles) {
    datasetFiles = filesData.getDatasetFiles;
  }

  return (
    <DataSetDetailView
      data={detailsData.datasetDetails}
      files={datasetFiles}
    />
  );
};

export default DataSetDetailContainer;
