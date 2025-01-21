import gql from 'graphql-tag';
import projectIcon from '../assets/icons/Projects.svg';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Project:',
  dataField: 'project_title',
};

const pageSubTitle = {
  dataField: 'project_id',
};

// --------------- Icons configuration --------------
const projectDetailIcon = {
  src: projectIcon,
  alt: 'INS projects logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  {
    sectionHeader: 'Project Information',
    properties: [
      {
        label: 'Associated Programs',
        dataField: 'program_acronyms',
        link: '{program_ids}',
      },
      {
        label: 'Organization',
        dataField: 'project_org_name',
      },
      {
        label: 'Project Start Date',
        dataField: 'project_start_date',
      },
      {
        label: 'Project End Date',
        dataField: 'project_end_date',
      },
      {
        label: 'Notice of Funding Opportunity',
        dataField: 'project_opportunity_number',
      },
    ],
  },
  {
    sectionHeader: 'Project Summary',
    properties: [
      {
        dataField: 'project_abstract_text',
      },
    ],
  },
];

// --------------- GraphQL query - Retrieve project details --------------
const GET_PROJECT_DETAIL_DATA_QUERY = gql`
query projectDetails($project_id: String) {
  projectDetails(project_id: $project_id) {
      project_abstract_text
      project_opportunity_number
      project_org_name
      program_acronyms
      program_ids
      project_end_date
      project_id
      project_start_date
      project_title
  }
}`;

const PROJECT_STATS_QUERY = gql`
query stats(
  $project_id: [String]
) {
stats(
  project_id: $project_id
) {
  numberOfGrants
  numberOfPrograms
  numberOfPublications
}
}`;

export {
  pageTitle,
  pageSubTitle,
  projectDetailIcon,
  leftPanel,
  externalLinkIcon,
  GET_PROJECT_DETAIL_DATA_QUERY,
  PROJECT_STATS_QUERY,
};
