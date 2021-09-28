import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [{
  label: 'Program',
  field: 'group',
  api: 'projectCountByProgram',
  apiForFiltering: 'filterProjectCountByProgram',
  datafield: 'programs',
  section: 'Filter By Projects',
  show: true,
},
{
  label: 'DOC',
  field: 'group',
  api: 'projectCountByDOC',
  apiForFiltering: 'filterProjectCountByDOC',
  datafield: 'docs',
  section: 'Filter By Projects',
  show: true,
},
{
  label: 'Fiscal Year',
  field: 'group',
  api: 'projectCountByFiscalYear',
  apiForFiltering: 'filterProjectCountByFiscalYear',
  datafield: 'fiscal_years',
  section: 'Filter By Projects',
  show: true,
},
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter By Cases': {
    color: '#10A075',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Samples': {
    color: '#10BEFF',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Files': {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
};

// --------------- Default Dashboard Sidebar Sections styling --------------
export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [{
  type: 'donut',
  label: 'Project by NCI DOCs (division, office, center)',
  dataName: 'projectCountByDOC',
  datatable_field: 'docs',
  titleText: 'Projects',
  show: true,
},
{
  type: 'donut',
  label: 'Publications by Publication Year',
  dataName: 'publicationCountByYear',
  datatable_field: 'publication_years',
  titleText: 'Publications',
  show: true,
},
{
  type: 'donut',
  label: 'Publications by RCR Range',
  dataName: 'publicationCountByRCRTransformed',
  datatable_field: 'rcr',
  titleText: 'Publications',
  show: true,
},
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};
export const resetIconFilter = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Projects',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
    {
      dataField: 'project_id',
      header: 'Project ID',
      sort: 'asc',
      link: '/project/{project_id}',
      primary: true,
      display: true,
    },
    {
      dataField: 'project_title',
      header: 'Project Title',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'principal_investigators',
      header: 'Principal Investigators',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'lead_doc',
      header: 'Lead DOC',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'award_amount',
      header: 'Award Amount',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'nci_funded_amount',
      header: 'NCI Funded Amount',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'award_notice_date',
      header: 'Award Notice Date',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'project_start_date',
      header: 'Project Start Date',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'project_end_date',
      header: 'Project End Date',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Sorting related labels configuration --------------
export const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

export const showCheckboxCount = 5;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfProjects
  numberOfPublications
  numberOfGEOs
  numberOfSRAs
  numberOfDBGaps
  numberOfClinicalTrials
  fileCountByProgram{
    group
    subjects
  }
  fileCountByContentFormat{
    group
    subjects
  }
  fileOverViewPaged(first: 100) {
    submitted_file_id
    ccdi_arm
    submission_date
    submission_ts
    source_ip
    file_count_validate
    filename_list_validate
    study_registered
    primary_datatype
    have_subject_ids
    have_pii
    contain_biospecimen_ids
    files{
      file_set_id
    }
  }
  }`;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{
  fileOverViewPaged(first: 1000000) {
    submitted_file_id
    ccdi_arm
    submission_date
    submission_ts
    source_ip
    file_count_validate
    filename_list_validate
    study_registered
    primary_datatype
    have_subject_ids
    have_pii
    contain_biospecimen_ids
    files{
      file_set_id
    }
  }
  }`;
