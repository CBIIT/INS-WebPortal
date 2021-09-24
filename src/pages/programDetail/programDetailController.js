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
    transformedData.projectCountInProgramByDOCData = data.projectCountInProgramByDOC;

    const projectCountInProgramByFundedAmountData = [
      {
        group: '< $0.5',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_1,
      },
      {
        group: '$0.5 to $1',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_2,
      },
      {
        group: '$1 to $3',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_3,
      },
      {
        group: '$3 to $10',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_4,
      },
      {
        group: '> $10',
        subjects: data.projectCountInProgramByFundedAmount[0].funded_amount_5,
      },
    ];

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
