import gql from 'graphql-tag';
// import { cellTypes } from '@bento-core/table';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program:',
  dataField: 'program_id',
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

// --------------- Left Pannel configuration --------------
const leftPanel = {
  attributes: [
    {
      dataField: 'program_id',
      label: 'Program',
    },
    {
      dataField: 'program_name',
      label: 'Program Name',
    },
    {
      dataField: 'program_description',
      label: 'Program Description',
    },
    {
      dataField: 'program_website',
      label: 'External Link to Program',
      externalLinkToLabel: true,
    },
  ],
};

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

// --------------- Table configuration --------------
// const table = {
//   name: 'Grants',
//   dataField: 'dataProject',
//   api: GET_PROJECTS_OVERVIEW_QUERY,
//   paginationAPIField: 'projectsOverview',
//   defaultSortField: 'project_id',
//   defaultSortDirection: 'asc',
//   count: 'numberOfGrants',
//   buttonText: 'Add Selected Files',
//   dataKey: 'project_id',
//   extendedViewConfig: {
//     pagination: true,
//     manageViewColumns: false,
//   },
//   columns: [
//     {
//       dataField: 'project_id',
//       header: 'Grant ID',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'queried_project_id',
//       header: 'Project ID',
//       cellType: cellTypes.LINK,
//       linkAttr: {
//         rootPath: '/project',
//         pathParams: ['queried_project_id'],
//       },
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'project_title',
//       header: 'Project Title',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'principal_investigators',
//       header: 'Principal Investigators',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'program_officers',
//       header: 'Program Officers',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'lead_doc',
//       header: 'Lead DOC',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'activity_code',
//       header: 'Activity Code',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'award_amount',
//       header: 'Award Amount',
//       display: true,
//       dataTransform: (money) => {
//         const formatter = new Intl.NumberFormat('en-US', {
//           style: 'currency',
//           currency: 'USD',
//           maximumFractionDigits: 0,
//         });

//         return formatter.format(money);
//       },
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'project_end_date',
//       header: 'Project End Date',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//     {
//       dataField: 'fiscal_year',
//       header: 'Fiscal Year',
//       display: true,
//       tooltipText: 'sort',
//       role: cellTypes.DISPLAY,
//     },
//   ],
//   id: 'project_tab',
//   tableID: 'project_tab_table',
//   downloadFileName: 'programs_download',
//   tableMsg: {
//     noMatch: 'No Matching Records Found',
//   },
// };

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
