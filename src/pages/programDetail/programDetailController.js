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
    transformedData.projectCountInProgramByDOCData = [...data.projectCountInProgramByDOC].sort((a, b) => ((a.doc_count < b.doc_count) ? 1 : -1));

    let projectCountInProgramByFundedAmountData = [
      {
        key: '< $0.5',
        doc_count: data.projectCountInProgramByFundedAmount[0].funded_amount_1,
      },
      {
        key: '$0.5 to $1',
        doc_count: data.projectCountInProgramByFundedAmount[0].funded_amount_2,
      },
      {
        key: '$1 to $3',
        doc_count: data.projectCountInProgramByFundedAmount[0].funded_amount_3,
      },
      {
        key: '$3 to $10',
        doc_count: data.projectCountInProgramByFundedAmount[0].funded_amount_4,
      },
      {
        key: '> $10',
        doc_count: data.projectCountInProgramByFundedAmount[0].funded_amount_5,
      },
    ];

    // eslint-disable-next-line max-len
    projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData.sort((a, b) => ((a.doc_count < b.doc_count) ? 1 : -1));

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
