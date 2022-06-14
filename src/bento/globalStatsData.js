import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#8DCAFF',
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '-7px',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Programs_.svg',
    statIconAlt: 'Temp',
  },
  {
    statTitle: 'Projects',
    type: 'field',
    statAPI: 'numberOfProjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Studies_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Publications',
    type: 'field',
    statAPI: 'numberOfPublicationsByProjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Cases_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Datasets',
    type: 'field',
    statAPI: 'numberOfDatasetsByProjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Samples_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Clinical Trials',
    type: 'field',
    statAPI: 'numberOfClinicalTrialsByProjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/CaseFiles_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Patents',
    type: 'field',
    statAPI: 'numberOfPatentsByProjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
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
