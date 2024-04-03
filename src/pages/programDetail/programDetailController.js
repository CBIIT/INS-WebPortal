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

  console.log('programCountsData: ', programCountsData);

  const {
    loading: programDetailsLoading,
    error: programDetailsError,
    data: programDetailsData,
  } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.id },
  });

  console.log('programDetailsData: ', programDetailsData);

  const programDetailsDataFake = {
    programProjectCount: 436,
    programGrantCount: 63,
    programPublicationCount: 53,
    programDetails: {
      program_name: 'Childhood Cancer Data Initiative',
      program_link: 'https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative',
      focus_area: 'Focus Area 1;Focus Area 2',
      contact_pi: 'Contact PI 1;Contact PI 2',
      doc: 'DOC 1;DOC 2',
      contact_nih: 'Contact NIH 1;Contact NIH 2',
      nofo: 'NOFO 1;NOFO 2',
      program_acronym: 'CCDI',
      program_id: 'ccdi',
    },
  };

  if (programCountsLoading || programDetailsLoading) return <CircularProgress />;

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

  // return <ProgramView data={programDetailsData} />;
  return <ProgramView data={programDetailsDataFake} />;
};

export default ProgramDetailContainer;
