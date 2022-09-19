import gql from 'graphql-tag';

export const searchEnabled = true;

export const filterTabTitleText = 'Filter';
export const searchTabTitleText = 'Search';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [{
  label: 'Program',
  field: 'group',
  api: 'projectCountByProgram',
  apiForFiltering: 'filterProjectCountByProgram',
  datafield: 'programs',
  section: 'Projects',
  show: true,
  tooltips: {
    CCDI: 'Childhood Cancer Data Initiative',
    Moonshot: 'Cancer Moonshot',
  },
},
{
  label: 'Division/Office/Center',
  field: 'group',
  api: 'projectCountByDOC',
  apiForFiltering: 'filterProjectCountByDOC',
  datafield: 'docs',
  section: 'Projects',
  show: true,
  tooltips: {
    CCG: 'Center for Cancer Genomics',
    CCT: 'Center for Cancer Training',
    CRCHD: 'Center to Reduce Cancer Health Disparities',
    CSSI: 'Center for Strategic Scientific Initiatives',
    DCB: 'Division of Cancer Biology',
    DCCPS: 'Division of Cancer Control and Population Sciences',
    DCP: 'Division of Cancer Prevention',
    DCTD: 'Division of Cancer Treatment and Diagnosis',
    OD: 'Office of the Director',
    SBIR: 'Small Business Innovation Research',
  },
},
{
  label: 'Fiscal Year',
  field: 'group',
  api: 'projectCountByFiscalYear',
  apiForFiltering: 'filterProjectCountByFiscalYear',
  datafield: 'fiscal_years',
  section: 'Projects',
  show: true,
},
{
  label: 'Award Amount',
  field: 'group',
  api: 'projectCountByAwardAmount',
  apiForFiltering: 'filterProjectCountByAwardAmount',
  datafield: 'award_amounts',
  section: 'Projects',
  show: true,
},
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Projects: {
    color: '#10A075',
    backgroundColor: '#C0E9D7',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: true,
  },
};

// --------------- Dashboard Facet Local Find Configuration --------------

export const facetSectionFindApi = {
  Projects: {
    api: 'subjectIds',
  },
};

export const search = {
  fileIds: {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
  subjectIds: {
    color: '#10A075',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: false,
  },
  sampleIds: {
    color: '#10BEFF',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: false,
  },
  fileNames: {
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

export const defaultSearch = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

// --------------- Dashboard ActiveFiltersQuery configuration --------------
export const displayActiveFiltersQuery = true;

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
  {
    type: 'donut',
    label: 'Project by Fiscal Year',
    dataName: 'projectCountByFiscalYearSorted',
    datatable_field: 'fiscal_year',
    titleText: 'Projects',
    show: true,
  },
  {
    type: 'donut',
    label: 'Project by NCI DOCs (division, office, center)',
    dataName: 'projectCountByDOCSorted',
    datatable_field: 'docs',
    titleText: 'Projects',
    show: true,
  },
  {
    type: 'donut',
    label: 'Project by Award Amount',
    dataName: 'projectCountByAwardAmountSorted',
    datatable_field: 'award_amount',
    titleText: 'Projects',
    show: true,
  },
  {
    type: 'donut',
    label: 'Publications by Publication Year',
    dataName: 'publicationCountByYearSorted',
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
  {
    type: 'donut',
    label: 'Publications by Citations',
    dataName: 'publicationCountByCitationSorted',
    datatable_field: 'citation',
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
      header: 'NCI Award Amount',
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
  fileOverView(first: 100) {
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
  fileOverView(first: 1000000) {
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
