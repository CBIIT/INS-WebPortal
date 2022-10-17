import gql from 'graphql-tag';

export const GET_PROJECTS_TAB = gql`
query projectOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int ,
  $first: Int ,
  $order_by: String ,
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
  keysToInclude: ['project_id', 'program', 'project_title', 'principal_investigators', 'program_officers', 'lead_doc', 'activity_code', 'award_amount', 'project_end_date', 'fiscal_year'],
  header: ['Project ID', 'Program', 'Project Title', 'Principal Investigators', 'Program Officers', 'Lead DOC', 'Activity Code', 'Award Amount', 'Project End Date', 'Fiscal Year'],
  query: GET_PROJECTS_TAB,
  apiVariable: 'projectOverView',
  fileName: 'INS Projects',
  defaultFullTableDownload: true,
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    subject_id
    program
    program_id
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}
}
`;

export const customSamplesTabDownloadCSV = {
  keysToInclude: ['sample_id', 'subject_id', 'program', 'arm', 'diagnosis', 'tissue_type', 'tissue_composition', 'sample_anatomic_site', 'sample_procurement_method', 'platform'],
  header: ['Sample ID', 'Case Id', 'Program Code', 'Arm', 'Diagnosis', 'Tissue Type', 'Tissue Composition', 'Sample Anatomic Site', 'Sample Procurement Method', 'Platform'],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_PARTICIPANTS_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    subject_id
    program
    program_id
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}
}
`;

export const customParticipantsTabDownloadCSV = {
  keysToInclude: ['sample_id', 'subject_id', 'program', 'arm', 'diagnosis', 'tissue_type', 'tissue_composition', 'sample_anatomic_site', 'sample_procurement_method', 'platform'],
  header: ['Sample ID', 'Case Id', 'Program Code', 'Arm', 'Diagnosis', 'Tissue Type', 'Tissue Composition', 'Sample Anatomic Site', 'Sample Procurement Method', 'Platform'],
  query: GET_PARTICIPANTS_TAB,
  apiVariable: 'participantOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_FILES_TAB = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_id
    file_name
    association
    file_description
    file_format
    file_size
    program
    program_id
    arm
    subject_id
    sample_id
    diagnosis
  }
}
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'association', 'file_description', 'file_format', 'file_size', 'program', 'arm', 'subject_id', 'sample_id', 'diagnosis'],
  header: ['File Name', 'Association', 'Description', 'File Format', 'Size', 'Program Code', 'Arm', 'Case Id', 'Sample ID', 'Diagnosis'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
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
