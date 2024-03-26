import React from 'react';
import _ from 'lodash';
// import { useQuery } from '@apollo/client';
// import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
// import Error from '../error/Error';
// import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../bento/programDetailData';

const ProgramDetailContainer = ({ match }) => {
  // const {
  //   loading: programDetailsLoading,
  //   error: programDetailsError,
  //   data: programDetailsData,
  // } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
  //   variables: { program_id: match.params.id },
  // });

  const programDetailsDataFake = {
    programProjectCount: 436,
    programGrantCount: 63,
    programPublicationCount: 53,
    program_link: 'https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative',
    focus_area: 'Focus Area 1;Focus Area 2',
    contact_pi: 'Contact PI 1;Contact PI 2',
    doc: 'DOC 1;DOC 2',
    contact_nih: 'Contact NIH',
    nofo: 'NOFO 1;NOFO 2',
    program_acronym: 'CCDI',
    programDetails: {
      program_id: 'CCDI',
      program_name: 'Childhood Cancer Data Initiative',
      program_description: 'The Childhood Cancer Data Initiative focuses on the critical need to collect, analyze, and share data to address the burden of childhood cancer. This initiative aims to make it easier for researchers to learn from each child with cancer.',
    },
  };

  // if (programDetailsLoading) return <CircularProgress />;
  // eslint-disable-next-line max-len
  // if (programDetailsError || !programDetailsData || !programDetailsData.programDetails || programDetailsData.programDetails.program_id !== match.params.id) {
  //   return (
  //     <Error />
  //   );
  // }
  return <ProgramView data={programDetailsDataFake} />;
};

export default ProgramDetailContainer;
