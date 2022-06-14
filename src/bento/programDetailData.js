import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  dataField: 'program_id',
};

const pageSubTitle = {
  dataField: 'program_name',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Projects',
  dataField: 'num_projects',
  link: '/explore',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
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

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      label: 'Projects by NCI DOCs',
      dataName: 'projectCountInProgramByDOCData',
      datatable_field: 'docs',
      titleText: 'Projects',
      display: true,
    },
    {
      label: 'Projects by NCI Funded Amount (MM $)',
      dataName: 'projectCountInProgramByFundedAmountData',
      datatable_field: 'funded_amount',
      titleText: 'Projects',
      display: true,
    },
  ],
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Projects',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'projects',
  // Value must be one of the 'field' in columns
  defaultSortField: 'project_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'project_id',
      header: 'Project',
      link: '/project/{project_id}',
    },
    {
      dataField: 'application_id',
      header: 'Application ID',
    },
    {
      dataField: 'project_title',
      header: 'Project Title',
    },
    {
      dataField: 'principal_investigators',
      header: 'Principal Investigators',
    },
    {
      dataField: 'lead_doc',
      header: 'Lead DOC',
    },
    {
      dataField: 'lead_doc',
      header: 'Lead DOC',
    },
    {
      dataField: 'award_amount',
      header: 'Award Amount',
    },
    {
      dataField: 'nci_funded_amount',
      header: 'NCI Funded Amount',
    },
    {
      dataField: 'award_notice_date',
      header: 'Award Notice Date',
    },
    {
      dataField: 'project_start_date',
      header: 'Project Start Date',
    },
    {
      dataField: 'project_end_date',
      header: 'Project End Date',
    },
  ],
};

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetail($program_id: String!) {
  projectCountInProgramByDOC(program_id: $program_id) {
    group
    subjects
  }
  projectCountInProgramByFundedAmount(program_id: $program_id) {
    funded_amount_1
    funded_amount_2
    funded_amount_3
    funded_amount_4
    funded_amount_5
  }
  programPublicationCount(program_id: $program_id)
  programDatasetCount(program_id: $program_id)
  programClinicalTrialCount(program_id: $program_id)
  programPatentCount(program_id: $program_id)
  programDetail(program_id: $program_id) {
    program_id
    program_name
    program_description
    program_website
    num_publications
    num_projects
    num_geos
    num_sras
    num_clinical_trials
    projects { 
      project_id
      application_id
      fiscal_year
      project_title
      project_type
      principal_investigators
      lead_doc
      program_officers
      award_amount
      nci_funded_amount
      award_notice_date
      project_start_date
      project_end_date
    }
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
