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

const PROGRAM_DETAIL_QUERY = gql`
query search(
  $program_ids: [String]
) {
searchProjects(
  program_ids: $program_ids
) {
  numberOfGrants
  numberOfProjects
  numberOfPublications
}
}`;

export {
  pageTitle,
  pageSubTitle,
  programDetailIcon,
  leftPanel,
  externalLinkIcon,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  PROGRAM_DETAIL_QUERY,
};
