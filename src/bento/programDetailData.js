import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program:',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_name',
};

// --------------- Icons configuration --------------
const programDetailIcon = {
  src: programIcon,
  alt: 'INS program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  {
    sectionHeader: 'Program Information',
    properties: [
      {
        label: 'Program Website',
        dataField: 'program_acronym',
        link: '{program_link}',
      },
      {
        label: 'Associated Focus Area(s)',
        dataField: 'focus_area',
      },
      {
        label: 'Principle Investigator(s)',
        dataField: 'contact_pi',
      },
    ],
  },
  {
    sectionHeader: 'NCI Support',
    properties: [
      {
        label: 'NCI Division/Office/Center (DOC)',
        dataField: 'doc',
      },
      {
        label: 'Program Officer',
        dataField: 'contact_nih',
      },
      {
        label: 'Associated Notices of Funding Opportunities (NOFO)',
        dataField: 'nofo',
      },
    ],
  },
];

export const GET_PROJECTS_OVERVIEW_QUERY = gql`
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

export const GET_GRANTS_OVERVIEW_QUERY = gql`
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

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
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

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetails($program_id: String) {
  programDetails(program_id: $program_id) {
      contact_nih
      contact_pi
      doc
      focus_area
      nofo
      program_acronym
      program_link
      program_name
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  programDetailIcon,
  leftPanel,
  externalLinkIcon,
  GET_PROGRAM_DETAIL_DATA_QUERY,
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
