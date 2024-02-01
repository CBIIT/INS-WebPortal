import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#B531AD',
  },
  statTitle: {
    color: '#D0D0D0',
  },
  statCount: {
    color: '#FFFFFF',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
  },
  {
    statTitle: 'Projects',
    type: 'field',
    statAPI: 'numberOfCoreProjects',
  },
  {
    statTitle: 'Grants',
    type: 'field',
    statAPI: 'numberOfProjects',
  },
  {
    statTitle: 'Publications',
    type: 'field',
    statAPI: 'numberOfPublications',
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfProjects
  numberOfCoreProjects
  numberOfPublications
}
  `;
