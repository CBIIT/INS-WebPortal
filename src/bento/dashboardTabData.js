import gql from 'graphql-tag';
import { customFilesTabDownloadCSV, customParticipantsTabDownloadCSV } from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Projects',
    dataField: 'dataProject',
    api: 'GET_PROJECTS_OVERVIEW_QUERY',
    paginationAPIField: 'projectOverViewPaged',
    paginationAPIFieldDesc: 'projectOverViewPagedDesc',
    defaultSortField: 'project_id',
    defaultSortDirection: 'asc',
    count: 'numberOfProjects',
    buttonText: 'Add Selected Files',
    dataKey: 'project_id',
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
        dataField: 'project_id',
        header: 'Project ID',
        sort: 'asc',
        link: '/project/{project_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'program',
        header: 'Program',
        sort: 'asc',
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
        dataField: 'project_end_date',
        header: 'Project End Date',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'fiscal_year',
        header: 'Fiscal Year',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'project_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'project_tab_table',
    selectableRows: false,
    tabIndex: '0',
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'INS_Dashboard_files_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: 'GET_PUBLICATIONS_OVERVIEW_QUERY',
    paginationAPIField: 'publicationOverViewPaged',
    paginationAPIFieldDesc: 'publicationOverViewPagedDesc',
    defaultSortField: 'publication_id',
    defaultSortDirection: 'asc',
    count: 'numberOfPublicationsByProjects',
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
        link: 'https://pubmed.ncbi.nlm.nih.gov/26988926/{publication_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'queried_project_id',
        header: 'Project ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'title',
        header: 'Title',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'authors',
        header: 'Authors',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'citation_count',
        header: 'Citation Count',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'relative_citation_ratio',
        header: 'Relative Citation Ratio',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'nih_percentile',
        header: 'NIH Percentile',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'publication_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type2',
    tableID: 'publication_tab_table',
    selectableRows: false,
    tabIndex: '1',
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'INS_Dashboard_files_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'GEOs',
    dataField: 'dataGEO',
    api: 'GET_GEOS_OVERVIEW_QUERY',
    paginationAPIField: 'geoOverViewPaged',
    paginationAPIFieldDesc: 'geoOverViewPagedDesc',
    defaultSortField: 'accession',
    defaultSortDirection: 'asc',
    count: 'numberOfGEOsByProjects',
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
        primary: true,
        display: true,
      },
      {
        dataField: 'title',
        header: 'Title',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'status',
        header: 'Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'submission_date',
        header: 'Submission Date',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'last_update_date',
        header: 'Last Update Date',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'geo_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type3',
    tableID: 'geo_tab_table',
    selectableRows: false,
    tabIndex: '2',
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'INS_Dashboard_files_download',
    headerPagination: true,
    footerPagination: true,
  },
  // {
  //   name: 'Datasets',
  //   dataField: 'dataDataset',
  //   api: 'GET_GEOS_OVERVIEW_QUERY',
  //   paginationAPIField: 'geoOverViewPaged',
  //   paginationAPIFieldDesc: 'geoOverViewPagedDesc',
  //   defaultSortField: 'accession',
  //   defaultSortDirection: 'asc',
  //   count: 'numberOfDatasetsByProjects',
  //   buttonText: 'Add Selected Files',
  //   dataKey: 'accession',
  //   saveButtonDefaultStyle: {
  //     color: '#fff',
  //     backgroundColor: '#DC2FDA',
  //     opacity: '1',
  //     border: '0px',
  //     cursor: 'pointer',
  //   },
  //   DeactiveSaveButtonDefaultStyle: {
  //     opacity: '0.3',
  //     cursor: 'auto',
  //   },
  //   ActiveSaveButtonDefaultStyle: {
  //     cursor: 'pointer',
  //     opacity: 'unset',
  //     border: 'unset',
  //   },
  //   columns: [
  //     {
  //       dataField: 'accession',
  //       header: 'Accession',
  //       sort: 'asc',
  //       primary: true,
  //       display: true,
  //     },
  //     {
  //       dataField: 'title',
  //       header: 'Title',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'status',
  //       header: 'Status',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'submission_date',
  //       header: 'Submission Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'last_update_date',
  //       header: 'Last Update Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //   ],
  //   id: 'geo_tab',
  //   onRowsSelect: 'type3',
  //   disableRowSelection: 'type3',
  //   tableID: 'geo_tab_table',
  //   selectableRows: false,
  //   tabIndex: '2',
  //   tableDownloadCSV: customFilesTabDownloadCSV,
  //   downloadFileName: 'INS_Dashboard_files_download',
  //   headerPagination: true,
  //   footerPagination: true,
  // },
  // {
  //   name: 'Clinical Trials',
  //   dataField: 'dataClinicalTrial',
  //   api: 'GET_CLINICAL_TRIALS_OVERVIEW_QUERY',
  //   paginationAPIField: 'clinicalTrialsOverViewPaged',
  //   paginationAPIFieldDesc: 'clinicalTrialsOverViewPagedDesc',
  //   defaultSortField: 'accession',
  //   defaultSortDirection: 'asc',
  //   count: 'numberOfClinicalTrialsByProjects',
  //   buttonText: 'Add Selected Files',
  //   dataKey: 'accession',
  //   saveButtonDefaultStyle: {
  //     color: '#fff',
  //     backgroundColor: '#DC2FDA',
  //     opacity: '1',
  //     border: '0px',
  //     cursor: 'pointer',
  //   },
  //   DeactiveSaveButtonDefaultStyle: {
  //     opacity: '0.3',
  //     cursor: 'auto',
  //   },
  //   ActiveSaveButtonDefaultStyle: {
  //     cursor: 'pointer',
  //     opacity: 'unset',
  //     border: 'unset',
  //   },
  //   columns: [
  //     {
  //       dataField: 'accession',
  //       header: 'Accession',
  //       sort: 'asc',
  //       primary: true,
  //       display: true,
  //     },
  //     {
  //       dataField: 'title',
  //       header: 'Title',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'status',
  //       header: 'Status',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'submission_date',
  //       header: 'Submission Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'last_update_date',
  //       header: 'Last Update Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //   ],
  //   id: 'clinical_trials_tab',
  //   onRowsSelect: 'type4',
  //   disableRowSelection: 'type4',
  //   tableID: 'clinical_trials_tab_table',
  //   selectableRows: false,
  //   tabIndex: '3',
  //   tableDownloadCSV: customFilesTabDownloadCSV,
  //   downloadFileName: 'INS_Dashboard_files_download',
  //   headerPagination: true,
  //   footerPagination: true,
  // },
  // {
  //   name: 'Patents',
  //   dataField: 'dataPatent',
  //   api: 'GET_PATENTS_OVERVIEW_QUERY',
  //   paginationAPIField: 'patentOverViewPaged',
  //   paginationAPIFieldDesc: 'patentOverViewPagedDesc',
  //   defaultSortField: 'accession',
  //   defaultSortDirection: 'asc',
  //   count: 'numberOfPatentsByProjects',
  //   buttonText: 'Add Selected Files',
  //   dataKey: 'accession',
  //   saveButtonDefaultStyle: {
  //     color: '#fff',
  //     backgroundColor: '#DC2FDA',
  //     opacity: '1',
  //     border: '0px',
  //     cursor: 'pointer',
  //   },
  //   DeactiveSaveButtonDefaultStyle: {
  //     opacity: '0.3',
  //     cursor: 'auto',
  //   },
  //   ActiveSaveButtonDefaultStyle: {
  //     cursor: 'pointer',
  //     opacity: 'unset',
  //     border: 'unset',
  //   },
  //   columns: [
  //     {
  //       dataField: 'accession',
  //       header: 'Accession',
  //       sort: 'asc',
  //       primary: true,
  //       display: true,
  //     },
  //     {
  //       dataField: 'title',
  //       header: 'Title',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'status',
  //       header: 'Status',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'submission_date',
  //       header: 'Submission Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //     {
  //       dataField: 'last_update_date',
  //       header: 'Last Update Date',
  //       sort: 'asc',
  //       display: true,
  //     },
  //   ],
  //   id: 'patent_tab',
  //   onRowsSelect: 'type5',
  //   disableRowSelection: 'type5',
  //   tableID: 'patent_tab_table',
  //   selectableRows: false,
  //   tabIndex: '4',
  //   tableDownloadCSV: customFilesTabDownloadCSV,
  //   downloadFileName: 'INS_Dashboard_files_download',
  //   headerPagination: true,
  //   footerPagination: true,
  // },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'project_tab',
    title: 'Projects',
    dataField: 'dataProject',
    count: 'numberOfProjects',
  },
  {
    id: 'publication_tab',
    title: 'Publications',
    dataField: 'dataPublication',
    count: 'numberOfPublicationsByProjects',
  },
  {
    id: 'dataset_tab',
    title: 'Datasets',
    dataField: 'dataDataset',
    count: 'numberOfDatasetsByProjects',
  },
  // {
  //   id: 'clinical_trials_tab',
  //   title: 'Clinical Trials',
  //   dataField: 'dataClinicalTrials',
  //   count: 'numberOfClinicalTrialssByProjects',
  // },
  // {
  //   id: 'patent_tab',
  //   title: 'Patents',
  //   dataField: 'dataPatent',
  //   count: 'numberOfPatentssByProjects',
  // },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Projects',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
  {
    title: 'Publications',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'GEOs',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
  // {
  //   title: 'Datasets',
  //   primaryColor: '#CFEDF9',
  //   secondaryColor: '#C9F1F1',
  //   selectedColor: '#0DAFEC',
  // },
  {
    title: 'Clinical Trials',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
  {
    title: 'Patents',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
];

export const DASHBOARD_QUERY = gql`
{
  numberOfPrograms
  numberOfProjects
  numberOfPublicationsByProjects
  numberOfDatasetsByProjects
  numberOfClinicalTrialsByProjects
  numberOfPatentsByProjects
  projectCountByProgram{
    group
    subjects
  }
  projectCountByDOC{
    group
    subjects
  }
  projectCountByFiscalYear{
    group
    subjects
  }
  projectCountByAwardAmount{
    group
    subjects
  }
  publicationCountByYear{
    group
    subjects
  }
  publicationCountByRCR{
    group
    subjects
  }
  publicationCountByCitation
  {
    group
    subjects
  }
  projectOverViewPaged(first: 100) {
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
  }
  }`;

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
    projectCountByProgram(project_ids: $subject_ids){
      group
      subjects
    }
    projectCountByDOC(project_ids: $subject_ids){
      group
      subjects
    }
    projectCountByFiscalYear(project_ids: $subject_ids){
      group
      subjects
    } 
    projectCountByAwardAmountr(project_ids: $subject_ids){
      group
      subjects
    } 
    publicationCountByYear(project_ids: $subject_ids){
      group
      subjects
    }
    publicationCountByRCR(project_ids: $subject_ids){
      group
      subjects
    }
    publicationCountByCitation(project_ids: $subject_ids){
      group
      subjects
    }
    numberOfPublicationsByProjects(project_ids: $subject_ids)
    numberOfDatasetsByProjects(project_ids: $subject_ids)
    numberOfClinicalTrialsByProjects(project_ids: $subject_ids)
    numberOfPatentsByProjects(project_ids: $subject_ids)
  }`;

export const FILTER_QUERY = gql`
query search($programs: [String] ,
  $docs: [String] ,
  $fiscal_years: [String] ,
  $first: Int ) {
searchProjects(programs: $programs,
  docs: $docs,
  fiscal_years: $fiscal_years,
      first: $first) {
        projectIds
        publicationIds
        accessions
        numberOfPrograms
        numberOfProjects
}
filterProjectCountByProgram(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amount: $award_amount) {
  group
  subjects
}
filterProjectCountByDOC(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amount: $award_amount) {
  group
  subjects
}
filterProjectCountByFiscalYear(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amount: $award_amount) {
  group
  subjects
}
filterProjectCountByAwardAmount(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amount: $award_amount) {
  group
  subjects
}
}`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_PROJECTS_OVERVIEW_QUERY = gql`
query projectOverViewPaged($project_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="project_id"){
  projectOverViewPaged(project_ids: $project_ids, first: $first, offset: $offset, order_by: $order_by) {
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
  }
}
  `;

export const GET_PROJECTS_OVERVIEW_DESC_QUERY = gql`
  query projectOverViewPagedDesc($project_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
    projectOverViewPagedDesc(project_ids: $project_ids, offset: $offset,first: $first, order_by: $order_by) {
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
    }
  }
    `;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationOverViewPaged($publication_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="publication_id"){
  publicationOverViewPaged(publication_ids: $publication_ids, first: $first, offset: $offset, order_by: $order_by) {
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
}
  `;

export const GET_PUBLICATIONS_OVERVIEW_DESC_QUERY = gql`
  query publicationOverViewPagedDesc($publication_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="publication_id"){
      publicationOverViewPagedDesc(publication_ids: $publication_ids, offset: $offset,first: $first, order_by: $order_by) {
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
  }
    `;

export const GET_GEOS_OVERVIEW_QUERY = gql`
  query geoOverViewPaged($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    geoOverViewPaged(accessions: $accessions, first: $first, offset: $offset, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
}
  `;

export const GET_GEOS_OVERVIEW_DESC_QUERY = gql`
  query geoOverViewPagedDesc($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    geoOverViewPagedDesc(accessions: $accessions, offset: $offset,first: $first, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
  }
    `;

export const GET_CLINICAL_TRIALS_OVERVIEW_QUERY = gql`
  query clinicalTrialOverViewPaged($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    clinicalTrialOverViewPaged(accessions: $accessions, first: $first, offset: $offset, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
}
  `;

export const GET_CLINICAL_TRIALS_OVERVIEW_DESC_QUERY = gql`
  query clinicalTrialOverViewPagedDesc($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    clinicalTrialOverViewPagedDesc(accessions: $accessions, offset: $offset,first: $first, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
  }
    `;

export const GET_PATENTS_OVERVIEW_QUERY = gql`
  query patentOverViewPaged($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    patentOverViewPaged(accessions: $accessions, first: $first, offset: $offset, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
}
  `;

export const GET_PATENTS_OVERVIEW_DESC_QUERY = gql`
  query patentOverViewPagedDesc($accessions: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="accession"){
    patentOverViewPagedDesc(accessions: $accessions, offset: $offset,first: $first, order_by: $order_by) {
      accession
      title
      status
      submission_date
      last_update_date
    }
  }
    `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
  query subjectOverViewPaged($subject_ids: [String], $first: Int = 10000000){
    fileOverViewPaged(submitted_file_ids: $subject_ids, first: $first) {
        files {
              file_id: file_set_id
        }
    }
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    files
}
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by: String = "file_name") {
  fileOverview(file_ids: $file_ids, offset: $offset, first: $first, order_by: $order_by) {
    file_id
  }
}
  `;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;
