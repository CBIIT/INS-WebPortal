import gql from 'graphql-tag';
// import { cellTypes } from '@bento-core/table';
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

// export const GET_PROJECTS_OVERVIEW_QUERY = gql`
// query projectsOverview(
//   $programs: [String],
//   $docs: [String],
//   $fiscal_years: [String],
//   $award_amounts: [String],
//   $offset: Int,
//   $first: Int,
//   $order_by: String,
//   $sort_direction: String
//   ){
//   projectsOverview(
//     programs: $programs,
//     docs: $docs,
//     fiscal_years: $fiscal_years,
//     award_amounts: $award_amounts,
//     first: $first,
//     offset: $offset,
//     order_by: $order_by,
//     sort_direction: $sort_direction
//     ) {
//     project_id,
//     queried_project_id,
//     application_id,
//     fiscal_year,
//     activity_code,
//     project_title,
//     project_type,
//     abstract_text,
//     keywords,
//     org_name,
//     org_city,
//     org_state,
//     org_country,
//     principal_investigators,
//     lead_doc,
//     program_officers,
//     award_amount,
//     nci_funded_amount,
//     award_notice_date,
//     project_start_date,
//     project_end_date,
//     full_foa,
//     program
//   }
// }
//   `;

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
  // table,
};
