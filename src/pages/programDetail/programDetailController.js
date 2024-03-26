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
    programDetails: {
      program_id: 'CCDI',
      program_name: 'Childhood Cancer Data Initiative',
      program_description: 'The Childhood Cancer Data Initiative focuses on the critical need to collect, analyze, and share data to address the burden of childhood cancer. This initiative aims to make it easier for researchers to learn from each child with cancer.',
      program_website: 'https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative',

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
