import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
import Error from '../error/Error';
import {
  GET_PROGRAM_DETAIL_DATA_QUERY,
  PROGRAM_DETAIL_QUERY,
} from '../../bento/programDetailData';

const ProgramDetailContainer = ({ match }) => {
  const {
    loading: programCountsLoading,
    error: programCountsError,
    data: programCountsData,
  } = useQuery(PROGRAM_DETAIL_QUERY, {
    variables: { program_ids: [match.params.id] },
  });

  const {
    loading: programDetailsLoading,
    error: programDetailsError,
    data: programDetailsData,
  } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.id },
  });

  if (
    programCountsLoading
    || programDetailsLoading
  ) return <CircularProgress />;

  if (
    programCountsError
    || !programCountsData
    || !programCountsData.searchProjects
    || programDetailsError
    || !programDetailsData
    || !programDetailsData.programDetails
  ) {
    return (
      <Error />
    );
  }

  const programDetailsAllData = {
    ...programCountsData.searchProjects,
    ...programDetailsData.programDetails,
    program_id: match.params.id,
    docTransformed: [programDetailsData.programDetails.program_doc.join(';')],
    focusAreaTransformed: [programDetailsData.programDetails.focus_area.join(';')],
    cancerTypesTransformed: [programDetailsData.programDetails.cancer_type.join(';')],
    nofoTransformed: [programDetailsData.programDetails.nofo.join(';')],
  };

  return <ProgramView data={programDetailsAllData} />;
};

export default ProgramDetailContainer;
