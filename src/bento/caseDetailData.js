/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

// -------------- Case ID area configurations --------------
const projectHeader = {
  label: 'Project ID',
  dataField: 'queried_project_id',
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
        label: 'Organization',
        dataField: 'org_name',
      },
      {
        label: 'Description',
        dataField: 'abstract_text',
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
        label: 'Award Amount Total',
        dataField: 'award_amount',
      },
      {
        label: 'NCI Award Amount Total',
        dataField: 'nci_funded_amount',
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
        label: 'NOFO',
        dataField: 'full_foa',
      },
      {
        label: 'Program',
        dataField: 'program',
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
    id: 'grant_tab_case_detail',
    title: 'Grants',
    dataField: 'dataProject',
    count: 'num_projects',
  },
  {
    id: 'publication_tab_case_detail',
    title: 'Publications',
    dataField: 'dataPublication',
    count: 'num_publications',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
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

// query name, also used as root of returned data
const dataRoot = 'projectDetail';
// Primary ID field used to query a case
const caseIDField = 'queried_project_id';

// --------------- GraphQL query configuration --------------

// GraphQL query to retrieve detailed info for a case
const CASE_DETAIL_QUERY = gql`
  query projectDetail($project_id: String!) {
    projectDetail(project_id: $project_id) {
      queried_project_id
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
      num_projects
      program
    }
  }
`;

export const GET_PROJECTS_OVERVIEW_QUERY = gql`
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

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
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

export {
  projectHeader,
  dataRoot,
  caseIDField,
  leftPanel,
  rightPanel,
  CASE_DETAIL_QUERY,
};

export const tabContainers = [
  {
    name: 'Grants',
    dataField: 'dataProjects',
    api: GET_PROJECTS_OVERVIEW_QUERY,
    paginationAPIField: 'projectOverViewByProject',
    defaultSortField: 'project_id',
    defaultSortDirection: 'asc',
    count: 'num_projects',
    buttonText: 'Add Selected Files',
    dataKey: 'project_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'project_id',
        header: 'Grant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/program',
          pathParams: ['program'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'project_title',
        header: 'Project Title',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'principal_investigators',
        header: 'Principal Investigators',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_officers',
        header: 'Program Officers',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'lead_doc',
        header: 'Lead DOC',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'award_amount',
        header: 'Award Amount',
        display: true,
        dataTransform: (money) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          });

          return formatter.format(money);
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'fiscal_year',
        header: 'Fiscal Year',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'case_detail_project_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'case_detail_project_tab_table',
    tabIndex: '0',
    downloadFileName: 'case_detail_projects_download',
  },
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: GET_PUBLICATIONS_OVERVIEW_QUERY,
    paginationAPIField: 'publicationOverViewByProject',
    defaultSortField: 'publication_id',
    defaultSortDirection: 'asc',
    count: 'num_publications',
    buttonText: 'Add Selected Files',
    dataKey: 'publication_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'publication_id',
        header: 'PubMed ID',
        cellType: cellTypes.EXTERNAL_LINK,
        linkAttr: {
          rootPath: 'https://pubmed.ncbi.nlm.nih.gov',
          pathParams: ['publication_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'title',
        header: 'Title',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'authors',
        header: 'Authors',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'citation_count',
        header: 'Citation Count',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'relative_citation_ratio',
        header: 'Relative Citation Ratio',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'publish_date',
        header: 'Publication Date',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'case_detail_publication_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'case_detail_publication_tab_table',
    tabIndex: '1',
    downloadFileName: 'case_detail_publications_download',
  },
];
