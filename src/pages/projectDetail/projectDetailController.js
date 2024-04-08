import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectView from './projectDetailView';
import Error from '../error/Error';
import {
  GET_PROJECT_DETAIL_DATA_QUERY,
  // PROJECT_DETAIL_QUERY,
} from '../../bento/projectDetailData';

const ProjectDetailContainer = ({ match }) => {
  // const {
  //   loading: projectCountsLoading,
  //   error: projectCountsError,
  //   data: projectCountsData,
  // } = useQuery(PROJECT_DETAIL_QUERY, {
  //   variables: { project_id: [match.params.id] },
  // });

  // console.log('projectCountsData: ', projectCountsData);

  const {
    loading: projectDetailsLoading,
    error: projectDetailsError,
    data: projectDetailsData,
  } = useQuery(GET_PROJECT_DETAIL_DATA_QUERY, {
    variables: { project_id: match.params.id },
  });

  console.log('projectDetailsData: ', projectDetailsData);

  if (
    // projectCountsLoading
    // ||
    projectDetailsLoading
  ) return <CircularProgress />;

  if (
    // projectCountsError
    // || !projectCountsData
    // || !projectCountsData.searchProjects
    // ||
    projectDetailsError
    || !projectDetailsData
    || !projectDetailsData.projectDetails
  ) {
    return (
      <Error />
    );
  }

  const projectDetailsAllData = {
    // ...projectCountsData.searchProjects,
    ...projectDetailsData.projectDetails,
    project_id: [match.params.id],
    docTransformed: [projectDetailsData.projectDetails.doc.join(';')],
    focusAreaTransformed: [projectDetailsData.projectDetails.focus_area.join(';')],
    nofoTransformed: [projectDetailsData.projectDetails.nofo.join(';')],
  };

  console.log('projectDetailsAllData: ', projectDetailsAllData);
  return <ProjectView data={projectDetailsAllData} />;
};

export default ProjectDetailContainer;
