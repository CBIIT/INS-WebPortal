import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataSetDetailView from './DetailView';
import Error from '../error/Error';
import { getDataSetDetailDataQuery } from '../../bento/datasetDetailData';

/**
 * The Resource Detail page controller component.
 *
 * @param {{ match: { params: { uuid: string }} }} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
const ResourceController = ({ match }) => {
  const { loading, error, data } = useQuery(getDataSetDetailDataQuery, {
    variables: { dataset_uuid: match.params.uuid },
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data || !data.datasetDetails) {
    return <Error />;
  }

  return <DataSetDetailView data={data.datasetDetails} />;
};

export default ResourceController;
