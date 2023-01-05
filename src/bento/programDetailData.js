import gql from 'graphql-tag';
import { customProgramsTableDownloadCSV } from './tableDownloadCSV';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  dataField: 'program_id',
};

const pageSubTitle = {
  dataField: 'program_name',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Projects',
  dataField: 'num_projects',
  link: '/explore',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const programDetailIcon = {
  src: programIcon,
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const leftPanel = {
  attributes: [
    {
      dataField: 'program_id',
      label: 'Program',
    },
    {
      dataField: 'program_name',
      label: 'Program Name',
    },
    {
      dataField: 'program_description',
      label: 'Program Description',
    },
    {
      dataField: 'program_website',
      label: 'External Link to Program',
      externalLinkToLabel: true,
    },
  ],
};

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      label: 'Projects by NCI DOCs',
      dataName: 'projectCountInProgramByDOCData',
      datatable_field: 'docs',
      titleText: 'Projects',
      display: true,
    },
    {
      label: 'Projects by Award Amount',
      dataName: 'projectCountInProgramByFundedAmountData',
      datatable_field: 'funded_amount',
      titleText: 'Projects',
      display: true,
    },
  ],
};

// --------------- Table configuration --------------
const table = {
  name: 'Projects',
  title: 'Projects',
  display: true,
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
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'project_title',
      header: 'Project Title',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '20%',
      },
    },
    {
      dataField: 'principal_investigators',
      header: 'Principal Investigators',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'program_officers',
      header: 'Program Officers',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'lead_doc',
      header: 'Lead DOC',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'activity_code',
      header: 'Activity Code',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'award_amount',
      header: 'Award Amount',
      sort: 'asc',
      display: true,
      dataTransform: (money) => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        });

        return formatter.format(money);
      },
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'project_end_date',
      header: 'Project End Date',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'fiscal_year',
      header: 'Fiscal Year',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
  ],
  id: 'project_tab',
  onRowsSelect: 'type1',
  disableRowSelection: 'type1',
  tableID: 'project_tab_table',
  selectableRows: false,
  tabIndex: '0',
  tableDownloadCSV: customProgramsTableDownloadCSV,
  downloadFileName: 'programs_download',
  headerPagination: true,
  footerPagination: true,
};

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetail($program_id: String!) {
  projectCountInProgramByDOC(program_id: $program_id) {
    group
    subjects
  }
  projectCountInProgramByFundedAmount(program_id: $program_id) {
    funded_amount_1
    funded_amount_2
    funded_amount_3
    funded_amount_4
    funded_amount_5
  }
  programPublicationCount(program_id: $program_id)
  programDatasetCount(program_id: $program_id)
  programClinicalTrialCount(program_id: $program_id)
  programPatentCount(program_id: $program_id)
  programDetail(program_id: $program_id) {
    program_id
    program_name
    program_description
    program_website
    num_projects
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
