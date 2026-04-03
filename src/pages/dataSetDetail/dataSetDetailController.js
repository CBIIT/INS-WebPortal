import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataSetDetailView from './dataSetDetailView';
import Error from '../error/Error';
import { getDataSetDetailDataQuery, getDatasetFilesQuery } from '../../bento/datasetDetailData';
import migrateDatasetId from '../../utils/datasetUtils';

/**
 * The Dataset Detail page controller component.
 *
 * @param {Object} props - The component props.
 * @param {*} props.match - The match object from React Router, containing URL parameter.
 * @returns {JSX.Element} The rendered component.
 */
const DataSetDetailContainer = ({ match }) => {
  const migrationResult = useMemo(() => migrateDatasetId(match.params.id || ''), [match.params.id]);
  if (migrationResult.originalId !== migrationResult.migratedId) {
    return <Redirect to={`/dataset/${migrationResult.migratedId}`} />;
  }

  const {
    loading: detailsLoading,
    error: detailsError,
    data: detailsData,
  } = useQuery(getDataSetDetailDataQuery, {
    variables: { dataset_uuid: migrationResult.migratedId },
    skip: !migrationResult.migratedId,
  });

  const {
    loading: filesLoading,
    error: filesError,
    data: filesData,
  } = useQuery(getDatasetFilesQuery, {
    variables: {
      dataset_uuid: migrationResult.migratedId,
      accessTypes: ['Open'],
    },
    skip: !migrationResult.migratedId,
  });

  if (detailsLoading || filesLoading) {
    return <CircularProgress />;
  }

  if (detailsError || !detailsData || !detailsData.datasetDetails) {
    return <Error />;
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
