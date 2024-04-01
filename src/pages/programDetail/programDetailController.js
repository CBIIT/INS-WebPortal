import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
import Error from '../error/Error';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../bento/programDetailData';

const ProgramDetailContainer = ({ match }) => {
  // eslint-disable-next-line max-len
  const { loading: programDetailsLoading, error: programDetailsError, data: programDetailsData } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.id },
  });

  const transformedData = _.cloneDeep(programDetailsData);

  if (programDetailsData) {
    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByDOCData = [...programDetailsData.projectCountInProgramByDOC].sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    let projectCountInProgramByFundedAmountData = [
      {
        group: '<$1M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_1,
      },
      {
        group: '$1M to $2M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_2,
      },
      {
        group: '$2M to $4M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_3,
      },
      {
        group: '$4M to $10M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_4,
      },
      {
        group: '>=$10M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_5,
      },
    ];

    // eslint-disable-next-line max-len
    projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData;
  }

  if (programDetailsLoading) return <CircularProgress />;
  // eslint-disable-next-line max-len
  if (programDetailsError || !programDetailsData || !programDetailsData.programDetail || programDetailsData.programDetail.program_id !== match.params.id) {
    return (
      <Error />
    );
  }
  return <ProgramView data={transformedData} />;
};

export default ProgramDetailContainer;
