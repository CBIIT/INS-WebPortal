import gql from 'graphql-tag';
import { cellTypes, cellStyles } from '@bento-core/table';

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

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'program_tab',
    title: 'Programs',
    dataField: 'dataProgram',
    count: 'numberOfPrograms',
  },
  {
    id: 'project_tab',
    title: 'Projects',
    dataField: 'dataProject',
    count: 'numberOfProjects',
  },
  {
    id: 'grant_tab',
    title: 'Grants',
    dataField: 'dataGrant',
    count: 'numberOfGrants',
  },
  {
    id: 'publication_tab',
    title: 'Publications',
    dataField: 'dataPublication',
    count: 'numberOfPublications',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Programs',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
  {
    title: 'Projects',
    primaryColor: '#E7E5F1',
    secondaryColor: '#C3DBD4',
    selectedColor: '#6D679E',
  },
  {
    title: 'Grants',
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
];

export const DASHBOARD_QUERY_NEW = gql`
query search(
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String],
) {
searchProjects(
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type
) {
  numberOfGrants
  numberOfPrograms
  numberOfProjects
  numberOfPublications
  programCountByFocusArea {
    group
    subjects
  }
  programCountByProgramDoc {
    group
    subjects
  }
  publicationCountByRelativeCitationRatio {
    group
    subjects
  }
  filterProjectCountByFocusArea {
      group
      subjects
  }
  filterProjectCountByCancerType {
    group
    subjects
}
}
}`;

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
  numberOfPublications(project_ids: $subject_ids)
  }`;

export const FILTER_QUERY = gql`
query searchProjects(
  $program_ids: [String],
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String]
) {
searchProjects(
  program_ids: $program_ids,
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type
) {
        numberOfPrograms
        numberOfGrants
        numberOfProjects
        numberOfPublications
}
filterProjectCountByFocusArea{
  group
  subjects
}
filterProjectCountByCancerType{
  group
  subjects
}
}`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_PROGRAMS_OVERVIEW_QUERY = gql`
query programsOverview(
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
programsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  data_link
  focus_area_str
  cancer_type_str
  program_acronym
  program_link
  program_name
  program_id
  data_link_and_program_acronym
}
}
  `;

export const GET_PROJECTS_OVERVIEW_QUERY = gql`
query projectsOverview(
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
projectsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type,
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  project_org_name
  program_names
  project_end_date
  project_id
  project_start_date
  project_title
  program_ids
}
}
  `;

export const GET_GRANTS_OVERVIEW_QUERY = gql`
query grantsOverview(
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
grantsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type,
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
  grant_end_date
  project_id
}
}
  `;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationsOverview(
  $program_names: [String],
  $focus_area: [String],
  $cancer_type: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
) {
publicationsOverview(
  program_names: $program_names,
  focus_area: $focus_area,
  cancer_type: $cancer_type,
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
  publication_title
}
}
  `;

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Programs',
    dataField: 'dataProgram',
    api: GET_PROGRAMS_OVERVIEW_QUERY,
    paginationAPIField: 'programsOverview',
    defaultSortField: 'program_name',
    defaultSortDirection: 'asc',
    count: 'numberOfPrograms',
    buttonText: 'Add Selected Files',
    dataKey: 'program_name',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'program_name',
        header: 'Program',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization\'s mission or some specific program-related aspect of that mission.',
        tooltipLocation: 'first',
        role: cellTypes.DISPLAY,
        className: 'programs_program_name_1',
      },
      {
        dataField: 'program_acronym',
        header: 'Website',
        cellType: cellTypes.CONDITIONAL_EXTERNAL_LINK,
        linkAttr: {
          pathParams: ['program_link'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Link to program website',
        role: cellTypes.DISPLAY,
        className: 'programs_program_acronym_2',
      },
      {
        dataField: 'focus_area_str',
        header: 'Special Topic',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'NCI research focus area',
        role: cellTypes.DISPLAY,
        className: 'programs_focus_area_str_3',
      },
      {
        dataField: 'cancer_type_str',
        header: 'Cancer Type',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Program\'s cancer type focus',
        role: cellTypes.DISPLAY,
        className: 'programs_cancer_type_str_4',
      },
      {
        dataField: 'data_link_and_program_acronym',
        header: 'Data Location Details',
        cellType: cellTypes.CONDITIONAL_EXTERNAL_LINK,
        linkAttr: {
          pathParams: ['data_link'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Link to program\'s data location, platform, or portal',
        tooltipLocation: 'last',
        role: cellTypes.DISPLAY,
        className: 'programs_program_acronym_5',
      },
    ],
    downloadColumns: [
      {
        dataField: 'program_name',
        header: 'Program',
      },
      {
        dataField: 'program_link',
        header: 'Website',
      },
      {
        dataField: 'focus_area_str',
        header: 'Special Topic',
      },
      {
        dataField: 'cancer_type_str',
        header: 'Cancer Type',
      },
      {
        dataField: 'data_link',
        header: 'Data Location Details',
      },
    ],
    id: 'program_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'program_tab_table',
    tabIndex: '0',
    downloadFileName: 'programs_download',
  },
  {
    name: 'Projects',
    dataField: 'dataProject',
    api: GET_PROJECTS_OVERVIEW_QUERY,
    paginationAPIField: 'projectsOverview',
    defaultSortField: 'project_id',
    defaultSortDirection: 'asc',
    count: 'numberOfProjects',
    buttonText: 'Add Selected Files',
    dataKey: 'project_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'project_id',
        header: 'Project ID',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/project',
          pathParams: ['project_id'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The primary unit of collaborative research effort sometimes also known as a core project or parent project. Projects receive funding from awards to conduct research and produce outputs, often across multiple years. Within INS, projects are contracts and groupings of extramural grants with identical Activity Code, Institute Code, and Serial Number. For example, 1P01CA210944-01 and 5P01CA210944-02 are both extramural grants awarded to project P01CA210944.',
        tooltipLocation: 'first',
        role: cellTypes.DISPLAY,
        className: 'projects_project_id_1',
      },
      {
        dataField: 'project_title',
        header: 'Project Title',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Title of the funded grant, contract, or intramural (sub)project.',
        role: cellTypes.DISPLAY,
        className: 'projects_project_title_2',
      },
      {
        dataField: 'program_names',
        header: 'Program(s)',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization\'s mission or some specific program-related aspect of that mission.',
        role: cellTypes.DISPLAY,
        className: 'projects_program_names_3',
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.TRANSFORM_LINK,
        linkAttr: {
          rootPath: '/program',
          pathParams: 'program_ids',
        },
      },
      {
        dataField: 'project_org_name',
        header: 'Organization',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The educational institution, research organization, business, or government agency receiving funding for the grant, contract, cooperative agreement, or intramural project.',
        role: cellTypes.DISPLAY,
        className: 'projects_org_name_4',
      },
      {
        dataField: 'project_start_date',
        header: 'Project Start Date',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The start date of a project. For subprojects of a multi-project grant, this is the start date of the parent award.',
        role: cellTypes.DISPLAY,
        className: 'projects_project_start_date_5',
      },
      {
        dataField: 'project_end_date',
        header: 'Project End Date',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The current end date of the project, including any future years for which commitments have been made. For subprojects of a multi-project grant, this is the end date of the parent award. Upon competitive renewal of a grant, the project end date is extended by the length of the renewal award.',
        tooltipLocation: 'last',
        role: cellTypes.DISPLAY,
        className: 'projects_project_end_date_6',
      },
    ],
    id: 'project_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'project_tab_table',
    tabIndex: '1',
    downloadFileName: 'projects_download',
  },
  {
    name: 'Grants',
    dataField: 'dataGrant',
    api: GET_GRANTS_OVERVIEW_QUERY,
    paginationAPIField: 'grantsOverview',
    defaultSortField: 'grant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfGrants',
    buttonText: 'Add Selected Files',
    dataKey: 'grant_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'grant_id',
        header: 'Grant ID',
        cellType: cellTypes.EXTERNAL_LINK,
        linkAttr: {
          rootPath: 'https://reporter.nih.gov/project-details',
          pathParams: ['grant_id'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Financial assistance mechanism providing money, property, or both to an eligible entity to carry out an approved project or activity. A grant is used whenever the NIH Institute or Center anticipates no substantial programmatic involvement with the recipient during performance of the financially assisted activities.',
        tooltipLocation: 'first',
        role: cellTypes.DISPLAY,
        className: 'grants_grant_id_1',
      },
      {
        dataField: 'project_id',
        header: 'Project',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/project',
          pathParams: ['project_id'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The primary unit of collaborative research effort sometimes also known as a core project or parent project. Projects receive funding from awards to conduct research and produce outputs, often across multiple years. Within INS, projects are contracts and groupings of extramural grants with identical Activity Code, Institute Code, and Serial Number. For example, 1P01CA210944-01 and 5P01CA210944-02 are both extramural grants awarded to project P01CA210944.',
        role: cellTypes.DISPLAY,
        className: 'grants_project_id_2',
      },
      {
        dataField: 'grant_title',
        header: 'Grant Title',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'Title of the funded grant, contract, or intramural (sub)project.',
        role: cellTypes.DISPLAY,
        className: 'grants_grant_title_3',
      },
      {
        dataField: 'principal_investigators',
        header: 'Principal Investigators',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The individual designated by the applicant organization to have the appropriate level of authority and responsibility to direct the project or program to be supported by the award.',
        role: cellTypes.DISPLAY,
        className: 'grants_principal_investigators_4',
      },
      {
        dataField: 'program_officers',
        header: 'Program Officers',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'An NCI or other institute staff member who coordinates the substantive aspects of a contract from planning the request for proposal to oversight.',
        role: cellTypes.DISPLAY,
        className: 'grants_program_officers_5',
      },
      {
        dataField: 'fiscal_year',
        header: 'Fiscal Year',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The fiscal year appropriation from which project funds were obligated.',
        role: cellTypes.DISPLAY,
        className: 'grants_fiscal_year_6',
      },
      {
        dataField: 'grant_end_date',
        header: 'Project End Date',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The current end date of the project, including any future years for which commitments have been made. For subprojects of a multi-project grant, this is the end date of the parent award. Upon competitive renewal of a grant, the project end date is extended by the length of the renewal award.',
        tooltipLocation: 'last',
        role: cellTypes.DISPLAY,
        className: 'grants_project_end_date_7',
      },
    ],
    id: 'grant_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'grant_tab_table',
    tabIndex: '2',
    downloadFileName: 'grants_download',
  },
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: GET_PUBLICATIONS_OVERVIEW_QUERY,
    paginationAPIField: 'publicationsOverview',
    defaultSortField: 'pmid',
    defaultSortDirection: 'asc',
    count: 'numberOfPublications',
    buttonText: 'Add Selected Files',
    dataKey: 'pmid',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'pmid',
        header: 'PubMed ID',
        cellType: cellTypes.EXTERNAL_LINK,
        linkAttr: {
          rootPath: 'https://pubmed.ncbi.nlm.nih.gov',
          pathParams: ['pmid'],
        },
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: '',
        tooltipLocation: 'first',
        role: cellTypes.DISPLAY,
        className: 'publications_pmid_1',
      },
      {
        dataField: 'project_ids',
        header: 'Project(s)',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'The primary unit of collaborative research effort sometimes also known as a core project or parent project. Projects receive funding from awards to conduct research and produce outputs, often across multiple years. Within INS, projects are contracts and groupings of extramural grants with identical Activity Code, Institute Code, and Serial Number. For example, 1P01CA210944-01 and 5P01CA210944-02 are both extramural grants awarded to project P01CA210944.',
        role: cellTypes.DISPLAY,
        className: 'publications_project_ids_2',
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.TRANSFORM_LINK,
        linkAttr: {
          rootPath: '/project',
          pathParams: ['project_ids'],
        },
      },
      {
        dataField: 'publication_title',
        header: 'Title',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: '',
        role: cellTypes.DISPLAY,
        className: 'publications_title_3',
      },
      {
        dataField: 'authors',
        header: 'Authors',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: '',
        role: cellTypes.DISPLAY,
        className: 'publications_authors_4',
      },
      {
        dataField: 'publication_date',
        header: 'Publication Date',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: '',
        role: cellTypes.DISPLAY,
        className: 'publications_publication_date_5',
      },
      {
        dataField: 'cited_by',
        header: 'Cited By',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: '',
        role: cellTypes.DISPLAY,
        className: 'publications_cited_by_6',
      },
      {
        dataField: 'relative_citation_ratio',
        header: 'Relative Citation Ratio',
        display: true,
        tooltipText: 'sort',
        tooltipDefinition: 'NIH Office of Portfolio Analysis metric of scientific influence. RCR represents the field- and time-normalized citation rate and is benchmarked to 1.0 for a typical (median) NIH paper in the corresponding year of publication. A paper with an RCR of 1.0 has received the same number of cites/year as the median NIH-funded paper in its field, a paper with an RCR of 2.0 has received twice as many cites/year as the median NIH-funded paper in its field, while an RCR of 0.5 means that it is receiving half as many citations per year. The RCR is not available for papers published last fiscal year, since, in general, not enough time has passed for citation statistics to meaningfully accrue in that time frame. An exception is made for papers with 5 or more citations since publication, as these are deemed to be accruing citations quickly enough for reliable calculations.',
        tooltipLocation: 'last',
        role: cellTypes.DISPLAY,
        className: 'publications_relative_citation_ratio_7',
      },
    ],
    id: 'publication_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'publication_tab_table',
    tabIndex: '3',
    downloadFileName: 'publications_download',
  },
];
