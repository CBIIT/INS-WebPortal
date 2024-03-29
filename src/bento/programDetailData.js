import gql from 'graphql-tag';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program:',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_name',
};

// --------------- Icons configuration --------------
const programDetailIcon = {
  src: programIcon,
  alt: 'INS program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  {
    sectionHeader: 'Program Information',
    properties: [
      {
        label: 'Program Website',
        dataField: 'program_acronym',
        link: '{program_link}',
      },
      {
        label: 'Associated Focus Area(s)',
        dataField: 'focus_area',
      },
      {
        label: 'Principle Investigator(s)',
        dataField: 'contact_pi',
      },
    ],
  },
  {
    sectionHeader: 'NCI Support',
    properties: [
      {
        label: 'NCI Division/Office/Center (DOC)',
        dataField: 'doc',
      },
      {
        label: 'Program Officer',
        dataField: 'contact_nih',
      },
      {
        label: 'Associated Notices of Funding Opportunities (NOFO)',
        dataField: 'nofo',
      },
    ],
  },
];

export const GET_PROJECTS_OVERVIEW_QUERY = gql`
query projectsOverview(
  $program_ids: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
projectsOverview(
  program_ids: $program_ids,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  org_name
  program_names
  project_end_date
  project_id
  project_start_date
  project_title
}
}
  `;

export const GET_GRANTS_OVERVIEW_QUERY = gql`
query grantsOverview(
  $program_ids: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
grantsOverview(
  program_ids: $program_ids,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  fiscal_year
  grant_id
  grant_title
  principal_investigators
  program_officers
  project_end_date
  project_id
}
}
  `;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationsOverview(
  $program_ids: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
publicationsOverview(
  program_ids: $program_ids,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  authors
  cited_by
  pmid
  project_ids
  publication_date
  relative_citation_ratio
  title
}
}
  `;

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetails($program_id: String) {
  programDetails(program_id: $program_id) {
      contact_nih
      contact_pi
      doc
      focus_area
      nofo
      program_acronym
      program_link
      program_name
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  programDetailIcon,
  leftPanel,
  externalLinkIcon,
  GET_PROGRAM_DETAIL_DATA_QUERY,
};
