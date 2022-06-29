/* eslint-disable */
import gql from 'graphql-tag';

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
    paginationAPIField: 'projectOverView',
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
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
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
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: 'GET_PUBLICATIONS_OVERVIEW_QUERY',
    paginationAPIField: 'publicationOverView',
    defaultSortField: 'publication_id',
    defaultSortDirection: 'asc',
    count: 'numberOfPublications',
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
      },
      {
        dataField: 'queried_project_ids',
        header: 'Project IDs',
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
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Datasets',
    dataField: 'dataDataset',
    api: 'GET_DATASETS_OVERVIEW_QUERY',
    paginationAPIField: 'datasetOverView',
    defaultSortField: 'accession',
    defaultSortDirection: 'asc',
    count: 'numberOfDatasets',
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
      },
      {
        dataField: 'link',
        header: 'Link',
        sort: 'asc',
        link: '{link}',
        display: false,
      },
      {
        dataField: 'queried_project_ids',
        header: 'Project IDs',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'transformed_type',
        header: 'Type',
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
      {
        dataField: 'release_date',
        header: 'Release Date',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'registration_date',
        header: 'Registration Date',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'dataset_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type3',
    tableID: 'dataset_tab_table',
    selectableRows: false,
    tabIndex: '2',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Clinical Trials',
    dataField: 'dataClinicalTrial',
    api: 'GET_CLINICAL_TRIALS_OVERVIEW_QUERY',
    paginationAPIField: 'clinicalTrialOverView',
    defaultSortField: 'clinical_trial_id',
    defaultSortDirection: 'asc',
    count: 'numberOfClinicalTrials',
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
      },
      {
        dataField: 'queried_project_ids',
        header: 'Project IDs',
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
        dataField: 'last_update_posted',
        header: 'Last Update Posted',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'recruitment_status',
        header: 'Recruitment Status',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'clinical_trial_tab',
    onRowsSelect: 'type4',
    disableRowSelection: 'type4',
    tableID: 'clinical_trial_tab_table',
    selectableRows: false,
    tabIndex: '3',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Patents',
    dataField: 'dataPatent',
    api: 'GET_PATENTS_OVERVIEW_QUERY',
    paginationAPIField: 'patentOverView',
    defaultSortField: 'patent_id',
    defaultSortDirection: 'asc',
    count: 'numberOfPatents',
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
      },
      {
        dataField: 'queried_project_ids',
        header: 'Project IDs',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'fulfilled_date',
        header: 'Fulfilled Date',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'patent_tab',
    onRowsSelect: 'type5',
    disableRowSelection: 'type5',
    tableID: 'patent_tab_table',
    selectableRows: false,
    tabIndex: '4',
    headerPagination: true,
    footerPagination: true,
  },
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
    count: 'numberOfPublications',
  },
  {
    id: 'dataset_tab',
    title: 'Datasets',
    dataField: 'dataDataset',
    count: 'numberOfDatasets',
  },
  {
    id: 'clinical_trial_tab',
    title: 'Clinical Trials',
    dataField: 'dataClinicalTrial',
    count: 'numberOfClinicalTrials',
  },
  {
    id: 'patent_tab',
    title: 'Patents',
    dataField: 'dataPatent',
    count: 'numberOfPatents',
  },
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

export const DASHBOARD_QUERY_NEW = gql`
query searchProjects (          
  $programs: [String] ,
  $docs: [String] ,
  $fiscal_years: [String] ,
  $award_amounts: [String]
){
  searchProjects (          
      programs: $programs,
      docs: $docs,
      fiscal_years: $fiscal_years,
      award_amounts: $award_amounts,
  ) {
    numberOfPrograms
    numberOfProjects
    numberOfPublications
    numberOfDatasets
    numberOfClinicalTrials
    numberOfPatents
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
    filterProjectCountByProgram{
      group
      subjects
    }
    filterProjectCountByDOC{
      group
      subjects
    }
    filterProjectCountByFiscalYear{
      group
      subjects
    }
    filterProjectCountByAwardAmount{
      group
      subjects
    }
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
    projectCountByAwardAmount(project_ids: $subject_ids){
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
    numberOfPublications(project_ids: $subject_ids)
    numberOfDatasets(project_ids: $subject_ids)
    numberOfClinicalTrials(project_ids: $subject_ids)
    numberOfPatents(project_ids: $subject_ids)
  }`;

export const FILTER_QUERY = gql`
query searchProjects($programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String]) {
searchProjects(programs: $programs,
  docs: $docs,
  fiscal_years: $fiscal_years,
  award_amounts: $award_amounts) {
        numberOfPrograms
        numberOfProjects
        numberOfPublications
        numberOfDatasets
        numberOfClinicalTrials
        numberOfPatents
}
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
filterProjectCountByProgram{
  group
  subjects
}
filterProjectCountByDOC{
  group
  subjects
}
filterProjectCountByFiscalYear{
  group
  subjects
}
filterProjectCountByAwardAmount{
  group
  subjects
}
}`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_PROJECTS_OVERVIEW_QUERY = gql`
query projectOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by: String = "project_id",
  $sort_direction: String = "asc"
  ){
  projectOverView(
    programs: $programs,
    docs: $docs,
    fiscal_years: $fiscal_years,
    award_amounts: $award_amounts,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
    ) {
    project_id,
    application_id,
    fiscal_year,
    project_title,
    project_type,
    abstract_text,
    keywords,
    org_name,
    org_city,
    org_state,
    org_country,
    principal_investigators,
    lead_doc,
    program_officers,
    award_amount,
    nci_funded_amount,
    award_notice_date,
    project_start_date,
    project_end_date,
    full_foa,
    program
  }
}
  `;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by: String = "publication_id",
  $sort_direction: String = "asc"
  ){
  publicationOverView(
    programs: $programs,
    docs: $docs,
    fiscal_years: $fiscal_years,
    award_amounts: $award_amounts,
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
    queried_project_ids
  }
}
  `;

export const GET_DATASETS_OVERVIEW_QUERY = gql`
  query datasetOverView(
    $programs: [String],
    $docs: [String],
    $fiscal_years: [String],
    $award_amounts: [String],
    $offset: Int = 0,
    $first: Int = 10,
    $order_by: String = "accession",
    $sort_direction: String = "asc"
    ){
    datasetOverView(
      programs: $programs,
      docs: $docs,
      fiscal_years: $fiscal_years,
      award_amounts: $award_amounts,
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
      queried_project_ids,
      type,
      link,
      transformed_type
    }
}
  `;

export const GET_CLINICAL_TRIALS_OVERVIEW_QUERY = gql`
  query clinicalTrialOverView(
    $programs: [String],
    $docs: [String],
    $fiscal_years: [String],
    $award_amounts: [String],
    $offset: Int = 0,
    $first: Int = 10,
    $order_by: String = "clinical_trial_id",
    $sort_direction: String = "asc"
    ){
    clinicalTrialOverView(
      programs: $programs,
      docs: $docs,
      fiscal_years: $fiscal_years,
      award_amounts: $award_amounts,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      clinical_trial_id,
      title,
      last_update_posted,
      recruitment_status,
      queried_project_ids
    }
}
  `;

export const GET_PATENTS_OVERVIEW_QUERY = gql`
  query patentOverView(
    $programs: [String],
    $docs: [String],
    $fiscal_years: [String],
    $award_amounts: [String],
    $offset: Int = 0,
    $first: Int = 10,
    $order_by: String = "patent_id",
    $sort_direction: String = "asc"
    ){
    patentOverView(
      programs: $programs,
      docs: $docs,
      fiscal_years: $fiscal_years,
      award_amounts: $award_amounts,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      patent_id,
      fulfilled_date,
      queried_project_ids
    }
}
  `;

// export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
//   query subjectOverView($subject_ids: [String], $first: Int = 10000000){
//     fileOverView(submitted_file_ids: $subject_ids, first: $first) {
//         files {
//               file_id: file_set_id
//         }
//     }
// }
//   `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
query search (          
  $subject_ids: [String],
){
  fileIDsFromList (          
      subject_ids: $subject_ids,
  ) 
}
  `;

// export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
// eslint-disable-next-line max-len
// query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
//   sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
//     files
// }
// }
//   `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query search (          
  $sample_ids: [String],
){
  fileIDsFromList (          
    sample_ids: $sample_ids,
  ) 
}
  `;

// export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
// eslint-disable-next-line max-len
// query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by: String = "file_name") {
//   fileOverview(file_ids: $file_ids, offset: $offset, first: $first, order_by: $order_by) {
//     file_id
//   }
// }
//   `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_names: [String] 
){
  fileIDsFromList (          
      file_names: $file_names
  ) 
}
  `;

export const GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART = gql`
query subjectsAddAllToCart(
  $subject_ids: [String],
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" 
  ){
  subjectOverview(
      subject_ids: $subject_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART = gql`
    query samplesAddAllToCart(
      $subject_ids: [String],
      $sample_ids: [String],
      $programs: [String] ,
      $studies: [String] ,
      $diagnoses: [String] ,
      $rc_scores: [String] ,
      $tumor_sizes: [String] ,
      $chemo_regimen: [String] ,
      $tumor_grades: [String] ,
      $er_status: [String] ,
      $pr_status: [String] ,
      $endo_therapies: [String] ,
      $meno_status: [String] ,
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          subject_ids: $subject_ids,
          sample_ids: $sample_ids,
          programs: $programs,
          studies: $studies,
          diagnoses: $diagnoses,
          rc_scores: $rc_scores,
          tumor_sizes: $tumor_sizes,
          chemo_regimen: $chemo_regimen,
          tumor_grades: $tumor_grades,
          er_status: $er_status,
          pr_status: $pr_status,
          endo_therapies: $endo_therapies,
          meno_status: $meno_status,
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,
          file_type: $file_type,
          age_at_index: $age_at_index,
          first: $first,
          offset: $offset,
          order_by: $order_by,
          sort_direction: $sort_direction
          ) {
          files
      }
    }
        `;

export const GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $subject_ids: [String],
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      subject_ids:$subject_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first, 
      offset: $offset, 
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
      file_id,
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
