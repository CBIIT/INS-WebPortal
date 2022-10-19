import gql from 'graphql-tag';
import { FileOnRowsSelect } from '../utils/fileTable';
import { SampleOnRowsSelect } from '../utils/sampleFileTable';

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

// --------------- Table 1 configuration --------------
const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Publications',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'publications',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'publication_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files associated with the selected sample(s).',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_files_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'publication_id',
      header: 'Publication ID',
      sort: 'asc',
      primary: true,
      link: 'https://pubmed.ncbi.nlm.nih.gov/{publication_id}/',
      display: true,
    },
    {
      dataField: 'title',
      header: 'Title',
    },
    {
      dataField: 'authors',
      header: 'Authors',
    },
    {
      dataField: 'citation_count',
      header: 'Citation Count',
    },
    {
      dataField: 'relative_citation_ratio',
      header: 'Relative Citation Ratio',
    },
    {
      dataField: 'nih_percentile',
      header: 'NIH Percentile',
    },
    {
      dataField: 'doi',
      header: 'DOI',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: SampleOnRowsSelect,
};

// --------------- Table 2 configuration --------------
const table2 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'GEOs',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'geos',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'accession',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'accession',
      header: 'Accession',
      link: 'https://www.ncbi.nlm.nih.gov/gds/?term={accession}',
    },
    {
      dataField: 'title',
      header: 'Title',
    },
    {
      dataField: 'status',
      header: 'Status',
    },
    {
      dataField: 'submission_date',
      header: 'Submission Date',
    },
    {
      dataField: 'last_update_date',
      header: 'Last Update Date',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 3 configuration --------------
const table3 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'SRAs',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'sras',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'accession',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon dbgap
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'accession',
      header: 'Accession',
      link: 'https://www.ncbi.nlm.nih.gov/sra/?term={accession}',
    },
    {
      dataField: 'study_title',
      header: 'Study Title',
    },
    {
      dataField: 'bioproject_accession',
      header: 'Bioproject Accession',
    },
    {
      dataField: 'registration_date',
      header: 'Registration Date',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 4 configuration --------------
const table4 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'DBGaps',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'dbgaps',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'accession',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'accession',
      header: 'Accession',
      link: 'https://www.ncbi.nlm.nih.gov/gap/?term={accession}',
    },
    {
      dataField: 'title',
      header: 'Title',
    },
    {
      dataField: 'release_date',
      header: 'Release Date',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 5 configuration --------------
const table5 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Clinical Trials',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'clinical_trials',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'clinical_trial_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'clinical_trial_id',
      header: 'Clinical Trial',
      link: 'https://clinicaltrials.gov/ct2/show/{clinical_trial_id}/',
    },
    {
      dataField: 'title',
      header: 'Title',
    },
    {
      dataField: 'last_update_posted',
      header: 'Last Update Posted',
    },
    {
      dataField: 'recruitment_status',
      header: 'Recruitment Status',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 6 configuration --------------
const table6 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Patents',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'patents',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'patent_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'patent_id',
      header: 'Patent ID',
    },
    {
      dataField: 'fulfilled_date',
      header: 'Fulfilled Date',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'projectDetail';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'project_id';

// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
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
      publications {
        publication_id
        pmc_id
        year
        journal
        title
        authors
        publish_date
        citation_count
        relative_citation_ratio
        nih_percentile
        doi
      }
      geos {
        accession
        title
        status
        submission_date
        last_update_date
      }
      sras {
        accession
        study_title
        bioproject_accession
        registration_date
      }
      dbgaps {
        accession
        title
        release_date
      }
      clinical_trials {
        clinical_trial_id
        title
        last_update_posted
        recruitment_status
      }
      patents {
        patent_id
        fulfilled_date
      }
    }
  }
`;

export {
  projectHeader,
  dataRoot,
  caseIDField,
  filesOfSamples,
  leftPanel,
  rightPanel,
  table1,
  table2,
  table3,
  table4,
  table5,
  table6,
  GET_CASE_DETAIL_DATA_QUERY,
};
