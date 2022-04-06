import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#8DCAFF',
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
    statAPI: 'numberOfProjects',
  },
  {
    statTitle: 'Publications',
    type: 'field',
    statAPI: 'numberOfPublicationsByProjects',
  },
  // {
  //   statTitle: 'GEOs',
  //   type: 'field',
  //   statAPI: 'numberOfGEOsByProjects',
  // },
  // {
  //   statTitle: 'SRAs',
  //   type: 'field',
  //   statAPI: 'numberOfSRAsByProjects',
  // },
  {
    statTitle: 'Datasets',
    type: 'field',
    statAPI: 'numberOfDatasetsByProjects',
  },
  {
    statTitle: 'Clinical Trials',
    type: 'field',
    statAPI: 'numberOfClinicalTrialsByProjects',
  },
  {
    statTitle: 'Patents',
    type: 'field',
    statAPI: 'numberOfPatentsByProjects',
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfProjects
  numberOfPublicationsByProjects
  numberOfDatasetsByProjects
  numberOfClinicalTrialsByProjects
  numberOfPatentsByProjects
}
  `;

// numberOfDBGapsByProjects
// numberOfGEOsByProjects
// numberOfSRAsByProjects
