import gql from 'graphql-tag';
import {
  customCaseDetailPublicationsTabDownloadCSV,
  customCaseDetailDatasetsTabDownloadCSV,
  customCaseDetailClinicalTrialsTabDownloadCSV,
  customCaseDetailPatentsTabDownloadCSV,
} from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

// -------------- Case ID area configurations --------------
const projectHeader = {
  label: 'Project ID',
  dataField: 'project_id',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Basic Info',
    // sectionDesc: 'Subsection description goes here',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Project Title',
        dataField: 'project_title',
      },
      {
        label: 'Fiscal Year',
        dataField: 'fiscal_year',
      },
      {
        label: 'Description',
        dataField: 'abstract_text',
      },
    ],
  },
  {
    sectionHeader: 'PI and Organization',
    // sectionDesc: 'Demographic Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Principal Investigators',
        dataField: 'principal_investigators',
      },
      {
        label: 'Program Officers',
        dataField: 'program_officers',
      },
      {
        label: 'Organization',
        dataField: 'org_name',
      },
      {
        label: 'Lead DOC',
        dataField: 'lead_doc',
      },
    ],
  },
];

const rightPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Award',
    // sectionDesc: 'Treatment Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Award Amount',
        dataField: 'award_amount',
      },
      {
        label: 'NCI Award Amount',
        dataField: 'nci_funded_amount',
      },
      {
        label: 'Award Notice Date',
        dataField: 'award_notice_date',
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
        label: 'FOA',
        dataField: 'full_foa',
      },
    ],
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'publication_tab_case_detail',
    title: 'Publications',
    dataField: 'dataPublication',
    count: 'num_publications',
  },
  {
    id: 'dataset_tab_case_detail',
    title: 'Datasets',
    dataField: 'dataDataset',
    count: 'num_datasets',
  },
  {
    id: 'clinical_trial_tab_case_detail',
    title: 'Clinical Trials',
    dataField: 'dataClinicalTrial',
    count: 'num_clinical_trials',
  },
  {
    id: 'patent_tab_case_detail',
    title: 'Patents',
    dataField: 'dataPatent',
    count: 'num_patents',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Publications',
    primaryColor: '#E7E5F1',
    secondaryColor: '#C3DBD4',
    selectedColor: '#6D679E',
  },
  {
    title: 'Datasets',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'Clinical Trials',
    primaryColor: '#D3F0F2',
    secondaryColor: '#E4E8D5',
    selectedColor: '#0FA8B1',
  },
  {
    title: 'Patents',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
];

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: 'GET_PUBLICATIONS_OVERVIEW_QUERY',
    paginationAPIField: 'publicationOverViewByProject',
    defaultSortField: 'publication_id',
    defaultSortDirection: 'asc',
    count: 'num_publications',
    buttonText: 'Add Selected Files',
    dataKey: 'publication_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'publication_id',
        header: 'PubMed ID',
        sort: 'asc',
        primary: true,
        link: 'https://pubmed.ncbi.nlm.nih.gov/{publication_id}/',
        display: true,
        headerStyles: {
          width: '5%',
        },
      },
      {
        dataField: 'title',
        header: 'Title',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '25%',
        },
      },
      {
        dataField: 'authors',
        header: 'Authors',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '25%',
        },
      },
      {
        dataField: 'citation_count',
        header: 'Citation Count',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'relative_citation_ratio',
        header: 'Relative Citation Ratio',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'nih_percentile',
        header: 'NIH Percentile',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
    ],
    id: 'case_detail_publication_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_detail_publication_tab_table',
    selectableRows: false,
    tabIndex: '0',
    tableDownloadCSV: customCaseDetailPublicationsTabDownloadCSV,
    downloadFileName: 'case_detail_publications_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Datasets',
    dataField: 'dataDataset',
    api: 'GET_DATASETS_OVERVIEW_QUERY',
    paginationAPIField: 'datasetOverViewByProject',
    defaultSortField: 'accession',
    defaultSortDirection: 'asc',
    count: 'num_datasets',
    buttonText: 'Add Selected Files',
    dataKey: 'accession',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'accession',
        header: 'Accession',
        sort: 'asc',
        link: '{link}',
        primary: true,
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'link',
        header: 'Link',
        sort: 'asc',
        link: '{link}',
        display: false,
      },
      {
        dataField: 'transformed_type',
        header: 'Type',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '5%',
        },
      },
      {
        dataField: 'title',
        header: 'Title',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '30%',
        },
      },
      {
        dataField: 'submission_date',
        header: 'Submission Date',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'last_update_date',
        header: 'Last Update Date',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'release_date',
        header: 'Release Date',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'registration_date',
        header: 'Registration Date',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
    ],
    id: 'case_detail_dataset_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_detail_dataset_tab_table',
    selectableRows: false,
    tabIndex: '1',
    tableDownloadCSV: customCaseDetailDatasetsTabDownloadCSV,
    downloadFileName: 'case_detail_datasets_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Clinical Trials',
    dataField: 'dataClinicalTrial',
    api: 'GET_CLINICAL_TRIALS_OVERVIEW_QUERY',
    paginationAPIField: 'clinicalTrialOverViewByProject',
    defaultSortField: 'clinical_trial_id',
    defaultSortDirection: 'asc',
    count: 'num_clinical_trials',
    buttonText: 'Add Selected Files',
    dataKey: 'clinical_trial_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'clinical_trial_id',
        header: 'Clinical Trial ID',
        sort: 'asc',
        link: 'https://clinicaltrials.gov/ct2/show/{clinical_trial_id}/',
        primary: true,
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'title',
        header: 'Title',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '55%',
        },
      },
      {
        dataField: 'last_update_posted',
        header: 'Last Update Posted',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
      {
        dataField: 'recruitment_status',
        header: 'Recruitment Status',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '10%',
        },
      },
    ],
    id: 'case_detail_clinical_trial_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_detail_clinical_trial_tab_table',
    selectableRows: false,
    tabIndex: '2',
    tableDownloadCSV: customCaseDetailClinicalTrialsTabDownloadCSV,
    downloadFileName: 'case_detail_clinical_trials_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Patents',
    dataField: 'dataPatent',
    api: 'GET_PATENTS_OVERVIEW_QUERY',
    paginationAPIField: 'patentOverViewByProject',
    defaultSortField: 'patent_id',
    defaultSortDirection: 'asc',
    count: 'num_patents',
    buttonText: 'Add Selected Files',
    dataKey: 'patent_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'patent_id',
        header: 'Patent ID',
        sort: 'asc',
        primary: true,
        display: true,
        headerStyles: {
          width: '40%',
        },
      },
      {
        dataField: 'fulfilled_date',
        header: 'Fulfilled Date',
        sort: 'asc',
        display: true,
        headerStyles: {
          width: '30%',
        },
      },
    ],
    id: 'case_detail_patent_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_detail_patent_tab_table',
    selectableRows: false,
    tabIndex: '3',
    tableDownloadCSV: customCaseDetailPatentsTabDownloadCSV,
    downloadFileName: 'case_detail_patents_download',
    headerPagination: true,
    footerPagination: true,
  },
];

// query name, also used as root of returned data
const dataRoot = 'projectDetail';
// Primary ID field used to query a case
const caseIDField = 'project_id';

// --------------- GraphQL query configuration --------------

// GraphQL query to retrieve detailed info for a case
const CASE_DETAIL_QUERY = gql`
  query projectDetail($project_id: String!) {
    projectDetail(project_id: $project_id) {
      project_id
      application_id
      fiscal_year
      project_title
      project_type
      abstract_text
      keywords
      org_name
      org_city
      org_state
      org_country
      principal_investigators
      lead_doc
      program_officers
      award_amount
      nci_funded_amount
      award_notice_date
      project_start_date
      project_end_date
      full_foa
      num_publications
      num_datasets
      num_clinical_trials
      num_patents
    }
  }
`;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationOverViewByProject(
  $project_id: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  publicationOverViewByProject(
    project_id: $project_id,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
  ) {
    publication_id,
    pmc_id,
    year,
    journal,
    title,
    authors,
    publish_date,
    citation_count,
    relative_citation_ratio,
    nih_percentile,
    doi,
  }
}
  `;

export const GET_DATASETS_OVERVIEW_QUERY = gql`
  query datasetOverViewByProject(
    $project_id: [String],
    $offset: Int,
    $first: Int,
    $order_by: String,
    $sort_direction: String 
    ){
    datasetOverViewByProject(
      project_id: $project_id,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      accession,
      title,
      submission_date,
      last_update_date,
      release_date,
      registration_date,
      type,
      link,
      transformed_type
    }
}
  `;

export const GET_CLINICAL_TRIALS_OVERVIEW_QUERY = gql`
  query clinicalTrialOverViewByProject(
    $project_id: [String],
    $offset: Int,
    $first: Int,
    $order_by: String,
    $sort_direction: String 
    ){
    clinicalTrialOverViewByProject(
      project_id: $project_id,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      clinical_trial_id,
      title,
      last_update_posted,
      recruitment_status,
    }
}
  `;

export const GET_PATENTS_OVERVIEW_QUERY = gql`
  query patentOverViewByProject(
    $project_id: [String],
    $offset: Int,
    $first: Int,
    $order_by: String,
    $sort_direction: String 
    ){
    patentOverViewByProject(
      project_id: $project_id,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      patent_id,
      fulfilled_date,
    }
}
  `;

export {
  projectHeader,
  dataRoot,
  caseIDField,
  leftPanel,
  rightPanel,
  CASE_DETAIL_QUERY,
};
