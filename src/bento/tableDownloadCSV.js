import gql from 'graphql-tag';

export const GET_PROGRAMS_TABLE = gql`
query projectOverView(
  $programs: [String],
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  projectOverView(
    programs: $programs,
    first: $first,
    order_by: $order_by,
    sort_direction: $sort_direction
    ) {
    project_id,
    application_id,
    fiscal_year,
    activity_code,
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
    full_foa
  }
}
`;

export const customProgramsTableDownloadCSV = {
  keysToInclude: [
    'project_id',
    'project_title',
    'principal_investigators',
    'program_officers',
    'lead_doc',
    'activity_code',
    'award_amount',
    'project_end_date',
    'fiscal_year',
  ],
  header: [
    'Project ID',
    'Project Title',
    'Principal Investigators',
    'Program Officers',
    'Lead DOC',
    'Activity Code',
    'Award Amount',
    'Project End Date',
    'Fiscal Year',
  ],
  query: GET_PROGRAMS_TABLE,
  apiVariable: 'projectOverView',
  fileName: 'INS Programs',
  defaultFullTableDownload: true,
};

export const GET_PROJECTS_TAB = gql`
query projectOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
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
    activity_code,
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

export const customProjectsTabDownloadCSV = {
  keysToInclude: [
    'project_id',
    'program',
    'project_title',
    'principal_investigators',
    'program_officers',
    'lead_doc',
    'activity_code',
    'award_amount',
    'project_end_date',
    'fiscal_year',
  ],
  header: [
    'Project ID',
    'Program',
    'Project Title',
    'Principal Investigators',
    'Program Officers',
    'Lead DOC',
    'Activity Code',
    'Award Amount',
    'Project End Date',
    'Fiscal Year',
  ],
  query: GET_PROJECTS_TAB,
  apiVariable: 'projectOverView',
  fileName: 'INS Projects',
  defaultFullTableDownload: true,
};

export const GET_PUBLICATIONS_TAB = gql`
query publicationOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
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

export const customPublicationsTabDownloadCSV = {
  keysToInclude: [
    'publication_id',
    'queried_project_ids',
    'title',
    'authors',
    'citation_count',
    'relative_citation_ratio',
    'nih_percentile',
  ],
  header: [
    'PubMed ID',
    'Project IDs',
    'Title',
    'Authors',
    'Citation Count',
    'Relative Citation Ratio',
    'NIH Percentile',
  ],
  query: GET_PUBLICATIONS_TAB,
  apiVariable: 'publicationOverView',
  fileName: 'INS Publications',
  defaultFullTableDownload: true,
};

export const GET_DATASETS_TAB = gql`
query datasetOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
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

export const customDatasetsTabDownloadCSV = {
  keysToInclude: [
    'accession',
    'queried_project_ids',
    'transformed_type',
    'title',
    'submission_date',
    'last_update_date',
    'release_date',
    'registration_date',
  ],
  header: [
    'Accession',
    'Project IDs',
    'Type',
    'Title',
    'Submission Date',
    'Last Update Date',
    'Release Date',
    'Registration Date',
  ],
  query: GET_DATASETS_TAB,
  apiVariable: 'datasetOverView',
  fileName: 'INS Datasets',
  defaultFullTableDownload: true,
};

export const GET_CLINICAL_TRIALS_TAB = gql`
query clinicalTrialOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
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

export const customClinicalTrialsTabDownloadCSV = {
  keysToInclude: [
    'clinical_trial_id',
    'queried_project_ids',
    'title',
    'last_update_posted',
    'recruitment_status',
  ],
  header: [
    'Clinical Trial ID',
    'Project IDs',
    'Title',
    'Last Update Posted',
    'Recruitment Status',
  ],
  query: GET_CLINICAL_TRIALS_TAB,
  apiVariable: 'clinicalTrialOverView',
  fileName: 'INS Clinical Trials',
  defaultFullTableDownload: true,
};

export const GET_PATENTS_TAB = gql`
query patentOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
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

export const customPatentsTabDownloadCSV = {
  keysToInclude: [
    'patent_id',
    'queried_project_ids',
    'fulfilled_date',
  ],
  header: [
    'Patent ID',
    'Project IDs',
    'Fulfilled Date',
  ],
  query: GET_PATENTS_TAB,
  apiVariable: 'patentOverView',
  fileName: 'INS Patents',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_PUBLICATIONS_TAB = gql`
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

export const customCaseDetailPublicationsTabDownloadCSV = {
  keysToInclude: [
    'publication_id',
    'title',
    'authors',
    'citation_count',
    'relative_citation_ratio',
    'nih_percentile',
  ],
  header: [
    'PubMed ID',
    'Title',
    'Authors',
    'Citation Count',
    'Relative Citation Ratio',
    'NIH Percentile',
  ],
  query: GET_CASE_DETAIL_PUBLICATIONS_TAB,
  apiVariable: 'publicationOverViewByProject',
  fileName: 'INS Case Detail Publications',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_DATASETS_TAB = gql`
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

export const customCaseDetailDatasetsTabDownloadCSV = {
  keysToInclude: [
    'accession',
    'transformed_type',
    'title',
    'submission_date',
    'last_update_date',
    'release_date',
    'registration_date',
  ],
  header: [
    'Accession',
    'Type',
    'Title',
    'Submission Date',
    'Last Update Date',
    'Release Date',
    'Registration Date',
  ],
  query: GET_CASE_DETAIL_DATASETS_TAB,
  apiVariable: 'datasetOverViewByProject',
  fileName: 'INS Case Detail Datasets',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_CLINICAL_TRIALS_TAB = gql`
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

export const customCaseDetailClinicalTrialsTabDownloadCSV = {
  keysToInclude: [
    'clinical_trial_id',
    'title',
    'last_update_posted',
    'recruitment_status',
  ],
  header: [
    'Clinical Trial ID',
    'Title',
    'Last Update Posted',
    'Recruitment Status',
  ],
  query: GET_CASE_DETAIL_CLINICAL_TRIALS_TAB,
  apiVariable: 'clinicalTrialOverViewByProject',
  fileName: 'INS Case Detail Clinical Trials',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_PATENTS_TAB = gql`
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

export const customCaseDetailPatentsTabDownloadCSV = {
  keysToInclude: [
    'patent_id',
    'fulfilled_date',
  ],
  header: [
    'Patent ID',
    'Fulfilled Date',
  ],
  query: GET_CASE_DETAIL_PATENTS_TAB,
  apiVariable: 'patentOverViewByProject',
  fileName: 'INS Case Detail Patents',
  defaultFullTableDownload: true,
};

export const MY_CART = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String ="") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'subject_id', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Case Id', 'Study Code'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'BENTO File Manifest',
  defaultFullTableDownload: false,
};
