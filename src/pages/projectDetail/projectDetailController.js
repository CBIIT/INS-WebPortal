import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectView from './projectDetailView';
import Error from '../error/Error';
import { GET_PROJECT_DETAIL_DATA_QUERY } from '../../bento/projectDetailData';

const ProjectDetailContainer = ({ match }) => {
  const {
    loading: projectDetailsLoading,
    error: projectDetailsError,
    data: projectDetailsData,
  } = useQuery(GET_PROJECT_DETAIL_DATA_QUERY, {
    variables: { project_id: match.params.id },
  });

  if (projectDetailsLoading) return <CircularProgress />;

  if (
    projectDetailsError
    || !projectDetailsData
    || !projectDetailsData.projectDetails
  ) {
    return (
      <Error />
    );
  }

  const projectDetailsAllData = {
    ...projectDetailsData.projectDetails,
    project_id: [match.params.id],
    numberOfPrograms: 1,
    numberOfGrants: 12,
    numberOfPublications: 123,
  };

  return <ProjectView data={projectDetailsAllData} />;
};

export default ProjectDetailContainer;
