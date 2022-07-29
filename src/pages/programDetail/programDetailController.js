import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../bento/programDetailData';

const ProgramDetailContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.id },
  });

  const transformedData = _.cloneDeep(data);

  if (data) {
    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByDOCData = [...data.projectCountInProgramByDOC].sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    let projectCountInProgramByFundedAmountData = [
      {
        group: '<$250k',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_1,
      },
      {
        group: '$250k to $499k',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_2,
      },
      {
        group: '$500k to $749k',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_3,
      },
      {
        group: '$750k to $999k',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_4,
      },
      {
        group: '>=$1M',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_5,
      },
    ];

    // eslint-disable-next-line max-len
    projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData;
  }

  if (loading) return <CircularProgress />;
  if (error || !data || data.programDetail.program_id !== match.params.id) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return <ProgramView data={transformedData} />;
};

export default ProgramDetailContainer;
