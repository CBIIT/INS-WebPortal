import gql from '@apollo/client';

export const STATS_QUERY = gql`{
    numberOfTrials
    numberOfCases
    numberOfFiles
  }
`;

export default STATS_QUERY;
