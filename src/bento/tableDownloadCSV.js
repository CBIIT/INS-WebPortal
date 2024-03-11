import gql from 'graphql-tag';

export const GET_PROGRAMS_LIST_TABLE = gql`
  query programInfo(
    $first: Int,
    $order_by: String,
    $sort_direction: String 
    ){
      programInfo(
      first: $first,
      order_by: $order_by,
      sort_direction: $sort_direction
      )  {
    program_id
    program_name
    program_description
    program_website
    num_projects
    num_publications
 }
}
 `;

export const customProgramsListTableDownloadCSV = {
  keysToInclude: [
    'program_id',
    'program_name',
    'program_website',
    'num_projects',
    'num_publications',
  ],
  header: [
    'Program',
    'Name',
    'Program Website',
    'Number of Projects',
    'Number of Publications',
  ],
  query: GET_PROGRAMS_LIST_TABLE,
  apiVariable: 'programInfo',
  fileName: 'INS Programs List',
  defaultFullTableDownload: true,
};

export const GET_PROGRAMS_TABLE = gql`
query projectsOverview(
  $programs: [String],
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  projectsOverview(
    programs: $programs,
    first: $first,
    order_by: $order_by,
    sort_direction: $sort_direction
    ) {
    queried_project_id,
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
    'queried_project_id',
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
    'Grant ID',
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
  apiVariable: 'projectsOverview',
  fileName: 'INS Program Details',
  defaultFullTableDownload: true,
};

export const GET_PROGRAMS_TAB = gql`
query programsOverview(
  $program_names: [String],
  $focus_area: [String],
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
programsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  first: $first,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  data_link
  focus_area_str
  program_link
  program_name
}
}
  `;

export const customProgramsTabDownloadCSV = {
  keysToInclude: [
    'program_name',
    'program_link',
    'focus_area_str',
    'data_link',
  ],
  header: [
    'Program',
    'Website',
    'Focus Area',
    'Data Location Details',
  ],
  query: GET_PROGRAMS_TAB,
  apiVariable: 'programsOverview',
  fileName: 'INS Programs',
  defaultFullTableDownload: true,
};

export const GET_PROJECTS_TAB = gql`
query projectsOverview(
  $program_names: [String],
  $focus_area: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
projectsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  org_name
  program_names
  project_end_date
  project_id
  project_start_date
  project_title
}
}
  `;

export const customProjectsTabDownloadCSV = {
  keysToInclude: [
    'project_id',
    'project_title',
    'program_names',
    'org_name',
    'project_start_date',
    'project_end_date',
  ],
  header: [
    'Project ID',
    'Project Title',
    'Program(s)',
    'Organization',
    'Project Start Date',
    'Project End Date',
  ],
  query: GET_PROJECTS_TAB,
  apiVariable: 'projectsOverview',
  fileName: 'INS Projects',
  defaultFullTableDownload: true,
};

export const GET_GRANTS_TAB = gql`
query grantsOverview(
  $program_names: [String],
  $focus_area: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
grantsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  fiscal_year
  grant_id
  grant_title
  principal_investigators
  program_officers
  project_end_date
  project_id
}
}
  `;

export const customGrantsTabDownloadCSV = {
  keysToInclude: [
    'grant_id',
    'project_id',
    'grant_title',
    'principal_investigators',
    'program_officers',
    'fiscal_year',
    'project_end_date',
  ],
  header: [
    'Grant ID',
    'Project',
    'Grant Title',
    'Principal Investigators',
    'Program Officers',
    'Fiscal Year',
    'Project End Date',
  ],
  query: GET_GRANTS_TAB,
  apiVariable: 'grantsOverview',
  fileName: 'INS Grants',
  defaultFullTableDownload: true,
};

export const GET_PUBLICATIONS_TAB = gql`
query publicationsOverview(
  $program_names: [String],
  $focus_area: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
publicationsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  authors
  cited_by
  pmid
  project_ids
  publication_date
  relative_citation_ratio
  title
}
}
  `;

export const customPublicationsTabDownloadCSV = {
  keysToInclude: [
    'pmid',
    'project_id',
    'title',
    'authors',
    'publication_date',
    'cited_by',
    'relative_citation_ratio',
  ],
  header: [
    'PubMed ID',
    'Project(s)',
    'Title',
    'Authors',
    'Publication Date',
    'Cited By',
    'Relative Citation Ratio',
  ],
  query: GET_PUBLICATIONS_TAB,
  apiVariable: 'publicationsOverview',
  fileName: 'INS Publications',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_PROJECTS_TAB = gql`
query projectOverViewByProject(
  $queried_project_id: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  projectOverViewByProject(
    queried_project_id: $queried_project_id,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
  ) {
    project_id,
    queried_project_id,
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

export const customCaseDetailProjectsTabDownloadCSV = {
  keysToInclude: [
    'project_id',
    'program',
    'project_title',
    'principal_investigators',
    'program_officers',
    'lead_doc',
    'award_amount',
    'fiscal_year',
  ],
  header: [
    'Grant ID',
    'Program',
    'Project Title',
    'Principal Investigators',
    'Program Officers',
    'Lead DOC',
    'Award Amount',
    'Fiscal Year',
  ],
  query: GET_CASE_DETAIL_PROJECTS_TAB,
  apiVariable: 'projectOverViewByProject',
  fileName: 'INS Project Details Grants',
  defaultFullTableDownload: true,
};

export const GET_CASE_DETAIL_PUBLICATIONS_TAB = gql`
query publicationOverViewByProject(
  $queried_project_ids: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  publicationOverViewByProject(
    queried_project_ids: $queried_project_ids,
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
    'publish_date',
  ],
  header: [
    'PubMed ID',
    'Title',
    'Authors',
    'Citation Count',
    'Relative Citation Ratio',
    'Publication Date',
  ],
  query: GET_CASE_DETAIL_PUBLICATIONS_TAB,
  apiVariable: 'publicationOverViewByProject',
  fileName: 'INS Project Details Publications',
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
