import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataSetDetailView from './dataSetDetailView';
import Error from '../error/Error';

const DataSetDetailContainer = ({ match }) => <DataSetDetailView />;
// const {
//   loading: projectCountsLoading,
//   error: projectCountsError,
//   data: projectCountsData,
// } = useQuery(PROJECT_STATS_QUERY, {
//   variables: { project_id: match.params.id },
// });

// const {
//   loading: projectDetailsLoading,
//   error: projectDetailsError,
//   data: projectDetailsData,
// } = useQuery(GET_PROJECT_DETAIL_DATA_QUERY, {
//   variables: { project_id: match.params.id },
// });

// if (
//   projectCountsLoading
//   || projectDetailsLoading
// ) return <CircularProgress />;

// if (
//   projectCountsError
//   || !projectCountsData
//   || projectDetailsError
//   || !projectDetailsData
//   || !projectDetailsData.projectDetails
// ) {
//   return (
//     <Error />
//   );
// }

export default DataSetDetailContainer;
